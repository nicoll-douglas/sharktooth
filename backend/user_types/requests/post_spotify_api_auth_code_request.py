class PostSpotifyApiAuthCodeRequest:
  """Type that represents a validated request body to endpoint POST /spotify-api/auth-code.

  Attributes:
    auth_code (str): The authorization code to obtain an access token with.
  """
  
  auth_code: str
  
# END class PostSpotifyApiAuthCodeRequest