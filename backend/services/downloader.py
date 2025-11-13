from services import YtDlpClient
import user_types.requests as req
from user_types import TrackBitrate, TrackCodec, TrackReleaseDate, DownloadUpdate, DownloadStatus, TrackArtistNames, NewDownload
import db, disk
import threading
from typing import cast, Callable
from sockets import DownloadsSocket

class Downloader:
  """A singleton class that acts as the controller for track downloads in the application.

  Attributes:
    _thread (threading.Thread | None): The thread where downloads run.
    _resume_loop_event (threading.Event): The event which determines whether the downloader loop should be proceed or not.
  """
  
  _thread: threading.Thread | None = None
  _resume_loop_event: threading.Event = threading.Event()


  @classmethod
  def resume_loop(cls):
    """Sets the resume loop event flag to true, resuming the download loop.
    """
    
    cls._resume_loop_event.set()
  # END resume_loop


  @classmethod
  def pause_loop(cls):
    """Sets the resume loop event flag to false, pausing the download loop.
    """

    cls._resume_loop_event.clear()
  # END pause_loop


  @classmethod
  def loop_should_proceed(cls) -> bool:
    """Determines whether the download loop should be allowed to proceed.

    Returns:
      bool: True if the resume loop event flag is true, false otherwise.
    """
    
    return cls._resume_loop_event.is_set()
  # END loop_should_proceed


  @classmethod
  def await_resume_loop(cls):
    """Await for the download loop to resume i.e the resume loop event flag to be set to true.
    """

    cls._resume_loop_event.wait()
  # END await_resume_loop


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
      update.status_msg = "In progress"

      DownloadsSocket.instance().send_download_update(update)
    # END progress_hook

    return progress_hook
  # END _create_progress_hook


  @classmethod
  def _thread_target(cls, resume: bool):
    """Defines the thread target to pass to the downloader thread when it is created.

    Args:
      resume (bool): Whether to resume downloads that were already in progress.
    """

    db_conn = db.connect()
    download_model = db.models.Download(db_conn)

    if resume:
      while (next_download := download_model.get_next(DownloadStatus.DOWNLOADING)):
        cls._download(next_download, download_model)
    
    while (next_download := download_model.get_next(DownloadStatus.QUEUED)):
      if not cls.loop_should_proceed():
        cls.await_resume_loop()
        continue

      cls._download(next_download, download_model)

    db_conn.close()
  # END _thread_target


  @classmethod
  def _download(cls, db_download: dict, download_model: db.models.Download):
    """Starts the download process for a download fetched from the database.

    Args:
      db_download (dict): The download data.
      download_model (db.models.Download): The download model used to get the download from the database.
    """

    download_id = db_download["download_id"]
    artist_names = TrackArtistNames([db_download["main_artist"], *db_download["other_artists"]])
    track_name = db_download["track_name"]
    codec = TrackCodec(db_download["codec"])
    bitrate = TrackBitrate(db_download["bitrate"])
    album_name = db_download["album_name"]
    download_dir = db_download["download_dir"]
    url = db_download["url"]
    track_number = db_download["track_number"]
    disc_number = db_download["disc_number"]
    release_date = TrackReleaseDate.from_string(db_download["release_date"]) if db_download["release_date"] else None
    album_cover_path = db_download["album_cover_path"]
    album_artist = db_download["album_artist"]
    genre = db_download["genre"]

    def _perform_initial_update() -> DownloadUpdate:
      """Performs the initial download update using the download data.

      Returns:
        DownloadUpdate: The initial update
      """
      
      update = DownloadUpdate()
      update.status = DownloadStatus.DOWNLOADING
      update.download_id = download_id
      update.artist_names = artist_names
      update.track_name = track_name
      update.codec = codec
      update.bitrate = bitrate
      update.url = url
      update.created_at = db_download["created_at"]
      update.download_dir = download_dir
      update.status_msg = "Awaiting download"
      update.terminated_at = None
      update.downloaded_bytes = None
      update.total_bytes = None
      update.eta = None
      update.speed = None

      download_model.update(update.download_id, {
        "status": update.status.value,
        "status_msg": update.status_msg
      })
      DownloadsSocket.instance().send_download_update(update)

      return update
    # END _perform_initial_update
    
    initial_update = _perform_initial_update()

    def _create_track_info() -> NewDownload:
      """Create track info to pass to yt-dlp for download.

      Returns:
        NewDownload: The track info.
      """
      
      track_info = NewDownload()
      track_info.album_name = album_name
      track_info.track_name = track_name
      track_info.artist_names = artist_names
      track_info.bitrate = bitrate
      track_info.codec = codec
      track_info.disc_number = disc_number
      track_info.track_number = track_number
      track_info.url = url
      track_info.download_dir = download_dir
      track_info.release_date = release_date
      track_info.album_cover_path = album_cover_path
      track_info.album_artist = album_artist
      track_info.genre = genre

      return track_info
    # END _create_track_info

    track_info = _create_track_info()
    progress_hook = cls._create_progress_hook(initial_update)

    is_success, result = YtDlpClient().download_track(track_info, progress_hook)
    
    if is_success:
      def _update_track_metadata(track: disk.Track):
        """Updates the downloaded audio file with the track metadata.

        Args:
          track (disk.Track): The track model instance representing the track on disk.
        """
        
        metadata = disk.Metadata()
        metadata.track_name = track_name
        metadata.artist_names = artist_names
        metadata.album_name = album_name
        metadata.track_number = track_number
        metadata.disc_number = disc_number
        metadata.release_date = release_date
        metadata.album_cover_path = album_cover_path
        metadata.album_artist = album_artist
        metadata.genre = genre

        try:
          if track_info.codec is TrackCodec.MP3:
            metadata.set_on_mp3(track.path)
          elif track_info.codec is TrackCodec.FLAC:
            metadata.set_on_flac(track.path)
        except Exception:
          pass
      # END _update_track_metadata

      track = cast(disk.Track, result)

      _update_track_metadata(track)

      terminated_at = download_model.get_current_timestamp()

      def _perform_completion_update():
        """Performs the final download update.
        """
        
        initial_update.status = DownloadStatus.COMPLETED
        initial_update.status_msg = None
        initial_update.terminated_at = terminated_at

        completion_update = initial_update

        download_model.set_completed(download_id, terminated_at)
        DownloadsSocket.instance().send_download_update(completion_update)
      # END _perform_completion_update

      _perform_completion_update()
    else:
      terminated_at = download_model.get_current_timestamp()
      status_msg = cast(str, result)

      def _perform_failed_update():
        initial_update.status = DownloadStatus.FAILED
        initial_update.status_msg = status_msg
        initial_update.terminated_at = terminated_at

        failed_update = failed_update

        download_model.set_failed(download_id, terminated_at, status_msg)
        DownloadsSocket.instance().send_download_update(failed_update)
      # END _perform_failed_update

      _perform_failed_update()
  # END _download


  @staticmethod
  def queue(tracks: list[NewDownload]) -> list[int]:
    """Inserts the track info into the database and inserts a download row as queued.

    Args:
      tracks (list[NewDownload]): Metadata and details about tracks that are to be downloaded.

    Returns:
      list[int]: The IDs of the newly inserted downloads.
    """

    inserted_ids = []

    with db.connect() as conn:
      artists_table = db.models.Artist(conn)
      mdata_table = db.models.Metadata(conn)
      mdata_artists_table = db.models.MetadataArtist(conn)
      downloads_table = db.models.Download(conn)

      for track in tracks:
        other_artist_ids = artists_table.insert_many([
          { "name": n } 
          for n in track.artist_names.get_other_artists()
        ])

        metadata_id = mdata_table.insert({
          "track_name": track.track_name,
          "main_artist": track.artist_names.get_main_artist(),
          "album_name": track.album_name,
          "track_number": track.track_number,
          "disc_number": track.disc_number,
          "release_date": str(track.release_date) if track.release_date else None,
          "album_cover_path": track.album_cover_path,
          "album_artist": track.album_artist,
          "genre": track.genre
        })
        metadata_id = cast(int, metadata_id)

        mdata_artists_table.insert_many([
          { "metadata_id": metadata_id, "artist_id": aid }
          for aid in other_artist_ids
        ])

        created_at = downloads_table.get_current_timestamp()

        download_id = downloads_table.insert_as_queued({
          "url": track.url,
          "codec": track.codec.value,
          "bitrate": track.bitrate.value,
          "metadata_id": metadata_id,
          "created_at": created_at,
          "download_dir": track.download_dir
        })

        inserted_ids.append(download_id)

        update = DownloadUpdate()
        update.status = DownloadStatus.QUEUED
        update.download_id = download_id
        update.artist_names = track.artist_names
        update.track_name = track.track_name
        update.codec = track.codec
        update.bitrate = track.bitrate
        update.url = track.url
        update.download_dir = track.download_dir
        update.terminated_at = None
        update.created_at = created_at
        update.status_msg = None
        update.eta = None
        update.speed = None
        update.downloaded_bytes = None
        update.total_bytes = None

        DownloadsSocket.instance().send_download_update(update)

    return inserted_ids
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