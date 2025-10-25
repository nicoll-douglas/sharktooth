from flask import Flask
from .downloads import downloads_bp
from .spotify_api import spotify_api_bp

def register_routes(app: Flask):
  """Registers the Flask blueprints/routes for the application.

  Args:
    app (Flask): The Flask app.
  """
  
  app.register_blueprint(downloads_bp)
  app.register_blueprint(spotify_api_bp)
# END register_routes