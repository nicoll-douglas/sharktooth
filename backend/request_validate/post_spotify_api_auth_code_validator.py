from user_types.reponses import PostSpotifyApiAuthCodeResponse
from user_types.requests import PostSpotifyApiAuthCodeRequest
from typing import Any, Literal

class PostSpotifyApiAuthCodeValidator():
  """Validator class that validates request bodies to the POST /spotify-api/auth-code endpoint.

  Attributes:
    _response (PostSpotifyApiAuthCodeResponse.BadRequest): A response body model instance associated with the endpoint.
    _request  PostSpotifyApiAuthCodeRequest): A request body model instance associated with the endpoint.
  """
  
  _response: PostSpotifyApiAuthCodeResponse.BadRequest
  _request: PostSpotifyApiAuthCodeRequest


  def __init__(self):
    self._response = PostSpotifyApiAuthCodeResponse.BadRequest()
    self._request = PostSpotifyApiAuthCodeRequest()
  # END __init__


  def validate(self, body: Any)-> tuple[Literal[False], PostSpotifyApiAuthCodeResponse.BadRequest] | tuple[Literal[True], PostSpotifyApiAuthCodeRequest]:
    """Performs full validation on the request body.

    Args:
      body (Any): A request body to validate.

    Returns:
      tuple[Literal[False], PostSpotifyApiAuthCodeResponse.BadRequest] | tuple[Literal[True], PostSpotifyApiAuthCodeRequest]: A tuple where on successful validation the first element is True and the second is the sanitized request body, or on failure the first element is False and the second is the response body to send.
    """
    
    bad_request = (False, self._response)
    
    if body is None or not isinstance(body, dict):
      self._response.field = ""
      self._response.message = "Body must be an object."
      return bad_request
    
    self._response.field = "auth_code"
    auth_code = body.get(self._response.field)

    if auth_code is None or auth_code == "":
      self._response.message = f"Field `{self._response.field}` is required."
      return bad_request
    
    if not isinstance(auth_code, str):
      self._response.message = f"Field `{self._response.field}` must be a string."
      return bad_request

    self._request.auth_code = auth_code

    return True, self._request
  # END validate

# END class DeleteDownloadsValidator