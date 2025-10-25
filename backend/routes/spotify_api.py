from flask import Blueprint, jsonify, Response
from services import SpotifyApiClient
from typing import Literal
from user_types.reponses import GetSpotifyApiAuthUrl

spotify_api_bp = Blueprint("spotify_api", __name__)

@spotify_api_bp.route("/spotify-api/auth-url", methods=["GET"])
def get_spotify_api_auth_url() -> tuple[Response, Literal[200]]:
  """Gets the auth URL for the user to authenticate/authorize with the Spotify API.
  
  Returns:
    tuple[Response, Literal[200]]: The response and status code.
  """

  res_body = GetSpotifyApiAuthUrl.Ok()
  res_body.auth_url = SpotifyApiClient.build_auth_url()
  
  return jsonify(res_body.__dict__), 200
# END get_spotify_api_auth_url