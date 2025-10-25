class GetSpotifyApiAuthUrl():
  """Class that contains nested classes to be used as models for responses to the GET /spotify-api/auth-url endpoint.
  """

  class Ok:
    """Represents the response body for a 200 status code response to a GET /spotify-api/auth-url request.

    Attributes:
      auth_url (str): The auth URL for the user to authenticate/authorize with the Spotify API.
    """

    auth_url: str
    
  # END class Ok

# END class GetSpotifyApiAuthUrl