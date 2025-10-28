/**
 * Represents the names of different IPC channels in the application.
 */
export enum IpcChannels {
  GET_SETTING = "settings:get",
  SET_SETTING = "settings:set",
  RESET_SETTINGS = "settings:reset",

  PICK_DIRECTORY = "dialog:pick-dir",
  PICK_IMAGE_FILE = "dialog:pick-img",

  OPEN_SPOTIFY_AUTH_WINDOW = "spotify-api:open-auth-window",
  SPOTIFY_AUTH_COMPLETE = "spotify-api:auth-complete",
  SPOTIFY_AUTH_WINDOW_CLOSED = "spotify-api:auth-window-closed",
  SPOTIFY_IS_AUTH = "spotify-api:is-authenticated",
  GET_SPOTIFY_USER_PROFILE = "spotify-api:get-user",
  GET_SPOTIFY_USER_PLAYLISTS = "spotify-api:get-user-playlists",
}
