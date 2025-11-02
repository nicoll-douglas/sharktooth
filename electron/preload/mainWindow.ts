import { contextBridge, ipcRenderer } from "electron";
import type {
  ElectronAPI,
  SettingsKey,
  SettingsValue,
} from "../../types/shared.js";
import { IpcChannel } from "../ipc/channels.js";

/**
 * The API object to be exposed on the window object in the renderer process.
 */
const electronAPI: ElectronAPI = {
  getSetting: async (key: SettingsKey) =>
    ipcRenderer.invoke(IpcChannel.GET_SETTING, key),

  setSetting: async (key: SettingsKey, value: SettingsValue) =>
    ipcRenderer.invoke(IpcChannel.SET_SETTING, key, value),

  resetSettings: async () => ipcRenderer.invoke(IpcChannel.RESET_SETTINGS),

  pickDirectory: async (dialogTitle: string) =>
    ipcRenderer.invoke(IpcChannel.PICK_DIRECTORY, dialogTitle),

  pickImageFile: async (dialogTitle: string) =>
    ipcRenderer.invoke(IpcChannel.PICK_IMAGE_FILE, dialogTitle),

  openSpotifyAuthWindow: async () =>
    ipcRenderer.invoke(IpcChannel.OPEN_SPOTIFY_AUTH_WINDOW),

  onSpotifyAuthComplete: (
    callback: (
      success: boolean,
      errorMsg: string | null
    ) => void | Promise<void>
  ) => {
    ipcRenderer.removeAllListeners(IpcChannel.SPOTIFY_AUTH_COMPLETE);

    ipcRenderer.on(
      IpcChannel.SPOTIFY_AUTH_COMPLETE,
      (_, success: boolean, errorMsg: string | null) => {
        callback(success, errorMsg);
      }
    );
  },

  onSpotifyAuthWindowClosed: async (callback: () => void | Promise<void>) => {
    ipcRenderer.removeAllListeners(IpcChannel.SPOTIFY_AUTH_WINDOW_CLOSED);

    ipcRenderer.on(IpcChannel.SPOTIFY_AUTH_WINDOW_CLOSED, () => callback());
  },

  spotifyUserIsAuth: async () => ipcRenderer.invoke(IpcChannel.SPOTIFY_IS_AUTH),

  getSpotifyUserProfile: async () =>
    ipcRenderer.invoke(IpcChannel.GET_SPOTIFY_USER_PROFILE),

  getSpotifyUserPlaylists: async () =>
    ipcRenderer.invoke(IpcChannel.GET_SPOTIFY_USER_PLAYLISTS),
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
