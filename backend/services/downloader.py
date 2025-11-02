from services import YtDlpClient
import user_types.requests as req
from user_types import TrackBitrate, TrackCodec, TrackReleaseDate, DownloadUpdate, DownloadStatus, TrackArtistNames
import db, disk
import threading
from typing import cast, Callable
from sockets import DownloadsSocket

class Downloader:
  """A singleton class that acts as the controller for track downloads in the application.

  Attributes:
    _thread (threading.Thread | None): The thread where downloads run.
  """
  
  _thread: threading.Thread | None = None


  @staticmethod
  def _create_progress_hook(update: DownloadUpdate) -> Callable[[dict], None]:
    """Creates a progress hook function to be passed to the yt-dlp client instance when downloading.

    Args:
      update (DownloadUpdate): Static downloaded update data for the download.

    Returns:
      Callable[[dict], None]: The progress hook function.
    """
    
    def progress_hook(hook_data: dict):
      """Updates the database with the updated downloaded data and emits and update to the downloads web socket.

      Args:
        hook_data (dict): The progress hook data received from the yt-dlp downloader.
      """
      
      with db.connect() as conn:
        db.models.Download(conn).update(update.download_id, {
          "status": DownloadStatus.DOWNLOADING.value,
          "total_bytes": hook_data["total_bytes"],
          "downloaded_bytes": hook_data["downloaded_bytes"],
          "speed": hook_data["speed"],
          "eta": hook_data.get("eta"),
          "status_msg": "In progress"
        })

      update.total_bytes = hook_data["total_bytes"]
      update.downloaded_bytes = hook_data["downloaded_bytes"]
      update.speed = hook_data["speed"]
      update.eta = hook_data.get("eta")
      update.terminated_at = None
      update.status_msg = "In progress"

      DownloadsSocket.instance().send_download_update(update)
    # END progress_hook

    return progress_hook
  # END _create_progress_hook


  @classmethod
  def _thread_target(cls, resume: bool):
    """Defines the thread target to pass to the downloader thread when it is created.
    """

    if resume:
      cls._resume()
    
    with db.connect() as conn:
      download_model = db.models.Download(conn)

      while (next_download := download_model.get_next(DownloadStatus.QUEUED)):
        cls._download(next_download, download_model)
  # END _thread_target


  @classmethod
  def _resume(cls):
    """Resumes the downloader for downloads that were in progress.
    """

    with db.connect() as conn:
      download_model = db.models.Download(conn)

      while (next_download := download_model.get_next(DownloadStatus.DOWNLOADING)):
        cls._download(next_download, download_model)
  # END resume


  @classmethod
  def _download(cls, db_download: dict, download_model: db.models.Download):
    """Starts the download process for a download fetched from the database.

    Args:
      db_download (dict): The download data.
      download_model (db.models.Download): The download model used to get the download from the database.
    """

    # create static download update data for first update and for progress hook
    update = DownloadUpdate()
    update.status = DownloadStatus.DOWNLOADING
    update.download_id = db_download["download_id"]
    update.artist_names = TrackArtistNames([db_download["main_artist"], *db_download["other_artists"]])
    update.track_name = db_download["track_name"]
    update.codec = TrackCodec(db_download["codec"])
    update.bitrate = TrackBitrate(db_download["bitrate"])
    update.url = db_download["url"]
    update.created_at = db_download["created_at"]
    update.download_dir = db_download["download_dir"]
    update.status_msg = "Awaiting download"
    update.terminated_at = None
    update.downloaded_bytes = None
    update.total_bytes = None
    update.eta = None
    update.speed = None

    # get the progress hook to pass to the track download function
    progress_hook = cls._create_progress_hook(update)

    # recreate original request object to pass as track info to the download function
    track_info = req.PostDownloadsRequest()
    track_info.album_name = db_download["album_name"]
    track_info.track_name = update.track_name
    track_info.artist_names = update.artist_names
    track_info.bitrate = update.bitrate
    track_info.codec = update.codec
    track_info.disc_number = db_download["disc_number"]
    track_info.track_number = db_download["track_number"]
    track_info.url = update.url
    track_info.download_dir = update.download_dir
    track_info.release_date = TrackReleaseDate.from_string(db_download["release_date"]) if db_download["release_date"] else None
    track_info.album_cover_path = db_download["album_cover_path"]

    download_model.update(update.download_id, {
      "status": update.status.value,
      "status_msg": update.status_msg
    })
    
    # send update with awaiting download
    DownloadsSocket.instance().send_download_update(update)

    # here when spotify sync is implemented, we will pass an associated track ID to go in the filename
    is_success, result = YtDlpClient().download_track(track_info, progress_hook)
    
    # handle success and failure cases
    if is_success:
      track_model = cast(disk.Track, result)

      metadata = disk.Metadata()
      metadata.track_name = track_info.track_name
      metadata.artist_names = track_info.artist_names
      metadata.album_name = track_info.album_name
      metadata.track_number = track_info.track_number
      metadata.disc_number = track_info.disc_number
      metadata.release_date = track_info.release_date
      metadata.album_cover_path = track_info.album_cover_path

      if track_info.codec is TrackCodec.MP3:
        metadata.set_on_mp3(track_model.path)
      elif track_info.codec is TrackCodec.FLAC:
        metadata.set_on_flac(track_model.path)

      update.status = DownloadStatus.COMPLETED
      update.status_msg = None
      update.terminated_at = download_model.get_current_timestamp()
      download_model.set_completed(update.download_id, update.terminated_at)
    else:
      update.status = DownloadStatus.FAILED
      update.status_msg = cast(str, result)

      update.terminated_at = download_model.get_current_timestamp()
      download_model.set_failed(update.download_id, update.terminated_at, update.status_msg)

    DownloadsSocket.instance().send_download_update(update)
  # END _download


  @staticmethod
  def queue(track_info: req.PostDownloadsRequest) -> int:
    """Inserts the track info into the database and inserts a download row as queued.

    Args:
      track_info (PostDownloadsRequest): Metadata and details about a track that is to be downloaded.

    Returns:
      int: The ID of the newly inserted download.
    """

    with db.connect() as conn:
      other_artist_ids = db.models.Artist(conn).insert_many([
        { "name": n } 
        for n in track_info.artist_names.get_other_artists()
      ])

      metadata_id = db.models.Metadata(conn).insert({
        "track_name": track_info.track_name,
        "main_artist": track_info.artist_names.get_main_artist(),
        "album_name": track_info.album_name,
        "track_number": track_info.track_number,
        "disc_number": track_info.disc_number,
        "release_date": str(track_info.release_date) if track_info.release_date else None,
        "album_cover_path": track_info.album_cover_path
      })
      metadata_id = cast(int, metadata_id)

      db.models.MetadataArtist(conn).insert_many([
        { "metadata_id": metadata_id, "artist_id": aid }
        for aid in other_artist_ids
      ])

      download_model = db.models.Download(conn)
      created_at = download_model.get_current_timestamp()

      download_id = download_model.insert_as_queued({
        "url": track_info.url,
        "codec": track_info.codec.value,
        "bitrate": track_info.bitrate.value,
        "metadata_id": metadata_id,
        "created_at": created_at,
        "download_dir": track_info.download_dir
      })

    update = DownloadUpdate()
    update.status = DownloadStatus.QUEUED
    update.download_id = download_id
    update.artist_names = track_info.artist_names
    update.track_name = track_info.track_name
    update.codec = track_info.codec
    update.bitrate = track_info.bitrate
    update.url = track_info.url
    update.download_dir = track_info.download_dir
    update.terminated_at = None
    update.created_at = created_at
    update.status_msg = None
    update.eta = None
    update.speed = None
    update.downloaded_bytes = None
    update.total_bytes = None

    DownloadsSocket.instance().send_download_update(update)

    return download_id
  # END queue


  @classmethod
  def start(cls, resume: bool = False) -> bool:
    """Starts the downloader in a new thread if not already running.

    Args:
      resume (bool): Whether to resume downloads that were already downloading.

    Returns:
      bool: True if the downloader thread was freshly started and not already running, False otherwise.
    """

    if cls._thread is not None and cls._thread.is_alive():
      return False

    cls._thread = threading.Thread(target=cls._thread_target, args=[resume], daemon=True)
    cls._thread.start()

    return True
  # END start


  @staticmethod
  def requeue(request: req.PostDownloadsRestartRequest) -> int:
    """Sets the status of the given downloads to queued in the database if not already queued/downloading and broadcasts the update to the socket.

    Args:
      request (PostDownloadsRestartRequest): The request to restart a download containing the download IDs.

    Returns:
      int: The number of downloads restarted.
    """

    with db.connect() as conn:
      dl = db.models.Download(conn)
      restart_count = dl.requeue(request.download_ids)

    if restart_count > 0:
      DownloadsSocket.instance().get_and_send_all_downloads()

    return restart_count
  # END requeue


  @staticmethod
  def delete(request: req.DeleteDownloadsRequest) -> int :
    """Deletes downloads and associated data, and broadcasts the update to the socket.

    Args:
      request (DeleteDownloadsRequest): The request to delete downloads containing the download IDs.

    Returns:
      int: The number of downloads deleted.
    """
    
    with db.connect() as conn:
      dl = db.models.Download(conn)
      metadata_ids = dl.get_metadata_ids(request.download_ids)

      delete_count = dl.delete_many(request.download_ids)

      if delete_count == 0:
        return 0
      
      artist_ids =  db.models.MetadataArtist(conn).get_many_artist_ids(metadata_ids)
      db.models.Artist(conn).delete_many(artist_ids)
      db.models.Metadata(conn).delete_many(metadata_ids)

    DownloadsSocket.instance().get_and_send_all_downloads()

    return delete_count
  # END delete
    
# END class Downloader