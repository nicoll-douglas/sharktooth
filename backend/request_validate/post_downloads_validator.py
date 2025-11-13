from user_types import TrackArtistNames, TrackCodec, TrackBitrate, TrackReleaseDate, enum_validate, NewDownload
from typing import Any, Literal, Callable, cast
from user_types.requests import PostDownloadsRequest
from user_types.reponses import PostDownloadsResponse
import copy
from pathvalidate import is_valid_filepath

class PostDownloadsValidator:
  """Validator class that validates request bodies to the POST /downloads endpoint.

  Attributes:
    _response (PostDownloadsResponse.BadRequest): A response body model instance associated with the endpoint.
    _request (PostDownloadsRequest): A request body model instance associated with the endpoint.
  """
  
  _response: PostDownloadsResponse.BadRequest
  _request: PostDownloadsRequest


  def __init__(self):
    self._response = PostDownloadsResponse.BadRequest()
    self._request = PostDownloadsRequest()
  # END __init__
  

  def _validate_body(self, body: Any)-> Literal[False] | dict:
    """Helper that validates a raw request body.

    Args:
      body (Any): A request body to validate.

    Returns:
      bool: False is the body is invalid, a copy of the raw body otherwise.
    """
    
    if body is None or not isinstance(body, dict):
      self._response.field = ""
      self._response.message = "Body must be an object."
      self._response.item_index = None
      return False
    
    return copy.deepcopy(body)
  # END _validate_body


  def _validate_download(self, download: Any) -> Literal[False] | NewDownload:
    """Validates that a download is of the correct structure.

    Args:
      download (Any): The download.
      download_index (int): The index of the download in the `downloads` list field.

    Returns:
      Literal[False] | NewDownload: False if validation failed, the sanitized download value otherwise.
    """
    
    if download is None or not isinstance(download, dict):
      self._response.field = "downloads"
      self._response.message = "Download must be an object."
      return False

    validators: list[tuple[Callable[[dict], Literal[False] | Any], str]] = [
      # (validator function, attribute name on download)
      (self._validate_artist_names, "artist_names"),
      (self._validate_track_name, "track_name"),
      (self._validate_url, "url"),
      (self._validate_download_dir, "download_dir"),
      (self._validate_album_cover_path, "album_cover_path"),
      (self._validate_codec, "codec"),
      (self._validate_bitrate, "bitrate"),
      (lambda download: self._validate_string_or_null(download, "album_name"), "album_name"),
      (lambda download: self._validate_string_or_null(download, "genre"), "genre"),
      (lambda download: self._validate_string_or_null(download, "album_artist"), "album_artist"),
      (lambda download: self._validate_track_or_disc_number(download, "track_number"), "track_number"),
      (lambda download: self._validate_track_or_disc_number(download, "disc_number"), "disc_number"),
      (self._validate_release_date, "release_date")
    ]

    validated_download = NewDownload()

    for validator_func, download_attr_name in validators:
      result = validator_func(download)

      if result is False:
        return False
      
      setattr(validated_download, download_attr_name, result)

    return validated_download
  # END _validate_download

  
  def _validate_downloads_list(self, body: dict) -> Literal[False] | list[Any]:
    """Validates the downloads field of the request body.

    Args:
      body (dict): The validate request body.

    Returns:
      Literal[False] | list[Any]: False if the field is invalid, the validated field value otherwise.
    """
    
    self._response.field = "downloads"
    downloads = body.get(self._response.field)

    if downloads is None:
      self._response.message = f"Field `{self._response.field}` is required."
      self._response.item_index = None

      return False
    
    if not isinstance(downloads, list):
      self._response.message = f"Field `{self._response.field}` must be an array."
      self._response.item_index = None

      return False

    if len(downloads) == 0:
      self._response.message = f"Field `{self._response.field}` must be of at least length 1."
      self._response.item_index = None

      return False

    return downloads
  # END _validate_downloads_list
  

  def _validate_artist_names(self, download: dict) -> Literal[False] | TrackArtistNames:
    """Helper that validates the `artist_names` field of a download.

    Args:
      download (dict): The download.

    Returns:
      Literal[False] | TrackArtistNames: False if the field is invalid, a TrackArtistNames instance otherwise.
    """
    
    self._response.field = "artist_names"
    
    try:
      artist_names = TrackArtistNames(download.get(self._response.field), self._response.field)
    except ValueError as e:
      self._response.message = str(e)
      return False
    
    return artist_names
  # END _validate_artist_names


  def _validate_track_name(self, download: dict) -> Literal[False] | str:
    """Helper that validates the `track_name` field of a download.

    Args:
      download (dict): The download.

    Returns:
      Literal[False] | str: False if the field is invalid, the validated field value otherwise.
    """

    self._response.field = "track_name"
    track_name = download.get(self._response.field)

    if track_name is None or track_name == "":
      self._response.message = f"Field `{self._response.field}` is required."
      return False
    
    if not isinstance(track_name, str):
      self._response.message = f"Field `{self._response.field}` must be a string."
      return False
    
    return track_name
  # END _validate_track_name


  def _validate_url(self, download: dict) -> Literal[False] | str:
    """Helper that validates the `url` field of a download.

    Args:
      download (dict): The download.

    Returns:
      Literal[False] | str: False is the field is invalid, the validated field value otherwise.
    """

    self._response.field = "url"
    url = download.get(self._response.field)

    if url is None or url == "":
      self._response.message = f"Field `{self._response.field}` is required."
      return False
    
    if not isinstance(url, str):
      self._response.message = f"Field `{self._response.field}` must be a string."
      return False
    
    return url
  # END _validate_url


  def _validate_codec(self, download: dict) -> Literal[False] | TrackCodec:
    """Helper that validates the `codec` field of a download.

    Args:
      download (dict): The download.

    Returns:
      Literal[False] | TrackCodec: False is the field is invalid, a TrackCodec instance otherwise.
    """
    
    self._response.field = "codec"
    codec = download.get(self._response.field)
    codec_valid, codec_validation_message = enum_validate(TrackCodec, self._response.field, codec)

    if not codec_valid:
      self._response.message = codec_validation_message
      return False
    
    return TrackCodec(codec)
  # END _validate_codec


  def _validate_bitrate(self, download: dict) -> Literal[False] | TrackBitrate:
    """Helper that validates the `bitrate` field of a download.

    Args:
      download (dict): The download.

    Returns:
      Literal[False] | TrackBitrate: False is the field is invalid, a TrackBitrate instance otherwise.
    """
    
    self._response.field = "bitrate"
    bitrate = download.get(self._response.field)
    bitrate_valid, bitrate_validation_message = enum_validate(TrackBitrate, self._response.field, bitrate)

    if not bitrate_valid:
      self._response.message = bitrate_validation_message
      return False

    return TrackBitrate(bitrate)
  # END _validate_bitrate
  

  def _validate_string_or_null(self, download: dict, field: str) -> Literal[False] | str | None:
    """Helper that validates a field of a download that should be a string or null.

    Args:
      download (dict): The download.
      field (str): The name of the field.

    Returns:
      Literal[False] | str | None: False is the field is invalid, the validated field's value otherwise.
    """
    
    self._response.field = field
    field_value = download.get(self._response.field)

    if field_value is not None and not isinstance(field_value, str):
      self._response.message = f"Field `{self._response.field}` must be a string or null."
      return False
    
    return field_value
  # END _validate_string_or_null


  def _validate_track_or_disc_number(self, download: dict, field_name: str) -> Literal[False] | int | None:
    """Helper that validates the `track_number` or `disc_number` field of a download.

    Args:
      download (dict): The download.
      field_name (str): The name of the field.

    Returns:
      Literal[False] | int | None: False is the field is invalid, the validated field's value otherwise.
    """
    
    self._response.field = field_name
    value = download.get(self._response.field)

    if value is not None:
      if not isinstance(value, int):
        self._response.message = f"Field `{self._response.field}` must be an integer or null."
        return False
      
      if value < 1:
        self._response.message = f"Field `{self._response.field}` must be greater than 0."
        return False
      
      if value > 99:
        self._response.message = f"Field `{self._response.field} must not be greater than 99."
        return False
      
    return value
  # END _validate_track_or_disc_number


  def _validate_release_date(self, download: dict) -> Literal[False] | TrackReleaseDate:
    """Helper that validates the `release_date` field of a download.

    Args:
      download (dict): The download.

    Returns:
      Literal[False] | TrackReleaseDate: False is the field is invalid, a TrackReleaseDate instance otherwise.
    """
    
    self._response.field = "release_date"
    release_date = download.get(self._response.field)

    if release_date is not None:
      try:
        release_date = TrackReleaseDate(release_date, self._response.field)
      except ValueError as e:
        message, field_name = e.args
        self._response.field = field_name
        self._response.message = message
        return False
      
    return release_date
  # END _validate_release_date


  def _validate_download_dir(self, download: dict) -> Literal[False] | str:
    """Helper that validates the `download_dir` field of a download.

    Args:
      download (dict): The download.

    Returns:
      Literal[False] | str: False is the field is invalid, the validated field's value otherwise.
    """
    
    self._response.field = "download_dir"
    download_dir = download.get(self._response.field)

    if download_dir is None or download_dir == "":
      self._response.message = f"Field `{self._response.field}` is required."
      return False

    if not isinstance(download_dir, str):
      self._response.message = f"Field `{self._response.field}` must be a string."
      return False

    if not is_valid_filepath(download_dir, "auto"):
      self._response.message = f"Field `{self._response.field}` must be a valid directory."
      return False
    
    return download_dir
  # END _validate_download_dir


  def _validate_album_cover_path(self, download: dict) -> Literal[False] | str | None:
    """Helper that validates the `album_cover_path` field of a download.

    Args:
      download (dict): The download.

    Returns:
      Literal[False] | str | None: False is the field is invalid, the validated field's value otherwise.
    """
    
    self._response.field = "album_cover_path"
    album_cover_path = download.get(self._response.field)

    if album_cover_path is None or album_cover_path == "":
      return album_cover_path
    
    if not isinstance(album_cover_path, str):
      self._response.message = f"Field `{self._response.field}` must be a string or null."
      return False
    
    if not is_valid_filepath(album_cover_path, "auto"):
      self._response.message = f"Field `{self._response.field}` must be a valid file path."
      return False
    
    return album_cover_path
  # END _validate_album_cover_path


  def validate(self, body: Any) -> tuple[Literal[False], PostDownloadsResponse.BadRequest] | tuple[Literal[True], PostDownloadsRequest]:
    """Performs full validation on the request body.

    Args:
      body (Any): The request body.

    Returns:
      tuple[Literal[False], PostDownloadsResponse.BadRequest] | tuple[Literal[True], PostDownloadsRequest]: A tuple where on successful validation the first element is True and the second is the sanitized request body, or on failure the first element is False and the second is the response body to send.
    """

    bad_request = (False, self._response)
    result = self._validate_body(body)

    if result is False:
      return bad_request
    
    validated_body = cast(dict, result)
    result = self._validate_downloads_list(validated_body)

    if result is False:
      return bad_request
    
    request_downloads_list = cast(list[Any], result)
    downloads_list = []

    for index, item in enumerate(request_downloads_list):
      result = self._validate_download(item)

      if result is False:
        self._response.item_index = index
        return bad_request
      
      downloads_list.append(result)
      
    self._request.downloads = downloads_list

    return True, self._request
  # END validate

# END class PostDownloadsValidator