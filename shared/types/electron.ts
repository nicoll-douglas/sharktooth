import type { SettingsKey, SettingsValue } from "./settings";
import type { SpotifyPlaylist, SpotifyUser } from "./spotify";

/**
 * The Electron API exposed to the renderer.
 */
export interface ElectronAPI {
  /**
   * Gets a setting's value from the application's settings store.
   *
   * @param key The key of the setting in the store.
   * @returns The setting's value.
   */
  getSetting: (key: SettingsKey) => Promise<SettingsValue>;

  /**
   * Sets a setting in the application's settings store.
   *
   * @param key The key of the setting to set.
   * @param value The value to set.
   */
  setSetting: (key: SettingsKey, value: SettingsValue) => Promise<void>;

  /**
   * Reset's the application's settings store.
   */
  resetSettings: () => Promise<void>;

  /**
   * Opens a directory picker dialog for the user to select a file system directory.
   *
   * @param dialogTitle The title of the dialog.
   * @returns The path of the directory if selected, null otherwise.
   */
  pickDirectory: (dialogTitle: string) => Promise<string | null>;

  /**
   * Opens a file picker dialog for the user to select an image from the file system.
   *
   * @param dialogTitle The title of the dialog.
   * @returns The path of the image if selected, null otherwise.
   */
  pickImageFile: (dialogTitle: string) => Promise<string | null>;

  /**
   * Opens up a second window for a user to authenticate/authorize with the Spotify API.
   */
  openSpotifyAuthWindow: () => Promise<void>;

  /**
   * Defines a callback to run whenever the user finishes authorizing with the Spotify API.
   *
   * @param callback The callback to run.
   */
  onSpotifyAuthComplete: (
    callback: (
      success: boolean,
      errorMsg: string | null
    ) => void | Promise<void>
  ) => void;

  /**
   * Defines a callback to run whenever the Spotify auth window closes.
   *
   * @param callback The callback.
   */
  onSpotifyAuthWindowClosed: (callback: () => void | Promise<void>) => void;

  /**
   * Checks the Spotify token store on disk to see if the user is currently authenticated.
   *
   * @returns true if the user is authenticated and has an access token, false otherwise.
   */
  spotifyUserIsAuth: () => Promise<boolean>;

  /**
   * Fetches Spotify user data from the Spotify API.
   *
   * @returns An array containing a success flag and the user data on success or null otherwise.
   */
  getSpotifyUserProfile: () => Promise<[true, SpotifyUser] | [false, null]>;

  /**
   * Fetches a user's Spotify playlists from the Spotify API.
   *
   * @returns An array containing a success flag and the playlist data on success or null otherwise.
   */
  getSpotifyUserPlaylists: () => Promise<
    [true, SpotifyPlaylist[]] | [false, null]
  >;
}
