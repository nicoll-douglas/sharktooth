from .track_artist_names import TrackArtistNames
from .track_codec import TrackCodec
from .track_bitrate import TrackBitrate
from .track_release_date import TrackReleaseDate

class NewDownload:
  """Type that represents a new track trying to be downloaded.

  Attributes:
    artist_names (TrackArtistNames): Track artist metadata.
    track_name (str): The name of the track.
    album_name (str): Album name metadata.
    codec (TrackCodec): The audio codec to use when saving the track file to disk.
    bitrate (TrackBitrate): The bitrate to use when saving an associated audio file to disk.
    track_number (int | None): Track number metadata.
    disc_number (int | None): Disc number metadata.
    release_date (TrackReleaseDate | None): Track release date metadata.
    url (str): The URL to use as the audio source for the track download.
    download_dir (str): The directory where the associated audio file should be saved to.
    filename (str): The name of the file for the track.
    album_cover_path (str | None): The path to an album cover image file.
    genre (str | None): Genre metadata.
    album_artist (str | None): Album artist metadata.
  """
  
  artist_names: TrackArtistNames
  track_name: str
  album_name: str | None
  codec: TrackCodec
  bitrate: TrackBitrate
  track_number: int | None
  disc_number: int | None
  release_date: TrackReleaseDate | None
  url: str
  download_dir: str
  album_cover_path: str | None
  genre: str | None
  album_artist: str | None
  filename: str
  
# END class NewDownload