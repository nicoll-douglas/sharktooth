/**
 * The URL of the Spotify API.
 */
export const API_URL = "https://api.spotify.com/v1";

/**
 * The URL of the API endpoint to obtain access and refresh tokens.
 */
export const TOKEN_URL = "https://accounts.spotify.com/api/token";

/**
 * The URL of the API endpoint to obtain an authorization code.
 */
export const AUTH_URL = "https://accounts.spotify.com/authorize";

/**
 * The Spotify API client ID of the app.
 */
export const CLIENT_ID = String(process.env.VITE_SPOTIFY_CLIENT_ID);

/**
 * The Spotify API redirect URI of the app.
 */
export const REDIRECT_URI = String(process.env.VITE_SPOTIFY_REDIRECT_URI);

/**
 * The scopes to ask for when the user authorizes.
 */
export const WANTED_SCOPES =
  "playlist-read-private user-library-read playlist-read-collaborative";
