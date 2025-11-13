import os, mimetypes
from pathvalidate import sanitize_filename
from user_types import NewDownload, TrackCodec

mimetypes.add_type("audio/flac", ".flac")

class Track:
  """A model class for interfacing with an audio/track file path on disk.

  Attributes:
    track_info (NewDownload): Metadata about the track.
    track_id (str | None): A unique ID associated with the track that will go in the file name if not None.
    ext (str): The extension (including the ".") of the track file associated with the codec in the track info.
    mimetype (str): The mimetype of the track file.
    output_template (str): The output filepath template for `yt_dlp` to know where to download the track to.
  """

  track_info: NewDownload
  ext: str
  mimetype: str
  path: str
  output_template: str


  def __init__(self, track_info: NewDownload):
    """Initializes Track.

    Will assign the appropriate save directory to `save_dir` and create the track file path's directories if they don't exist.
    """
    
    self.track_info = track_info
    self.ext = "." + self.track_info.codec.value
    self.mimetype = mimetypes.types_map[self.ext]
    self.path = self.build_path(track_info.download_dir, track_info.filename, track_info.codec)
    self.output_template = self._build_output_template()

    os.makedirs(os.path.dirname(self.path), exist_ok=True)
  # END __init__
  

  @classmethod
  def build_path(cls, download_dir: str, filename: str, codec: TrackCodec):
    """Builds the full path of where a track should be stored.

    Args:
      download_dir (str): The directory where the track will be stored.
      filename (str): The name of the file for the track.
      codec (TrackCodec): The codec of the track.

    Returns:
      str: The file path.
    """

    return os.path.join(
      download_dir, 
      sanitize_filename(filename, platform="auto") + codec.value
    )
  # END build_path
    

  def _build_output_template(self) -> str:
    """Builds the output filepath template for `yt_dlp` to know where to download the track to.

    Returns:
      str: The output filepath template.
    """

    return os.path.join(
      self.track_info.download_dir,
      f"{sanitize_filename(self.track_info.filename, platform="auto")}.%(ext)s"
    )
  # END _build_output_template


  def exists(self) -> bool:
    """Checks whether the track file exists.

    Returns:
      bool: True if it exists, false otherwise.
    """

    return os.path.exists(self.path)
  # END exists

# END class Track