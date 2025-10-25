class PostSpotifyApiAuthCodeResponse():
  class BadRequest:
    """Represents the response body for a 400 status code response to a POST /spotify-api/auth-code request.

    Attributes:
      field (str): The first field that failed request validation; will match a key in the JSON request body.
      message (str): A user-friendly message indicating the validation error.
    """
  
    field: str
    message: str

  # END class BadRequest

# END class PostSpotifyApiAuthCodeResponse