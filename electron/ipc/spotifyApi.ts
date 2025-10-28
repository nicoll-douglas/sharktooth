import { BrowserWindow, ipcMain } from "electron";
import { IpcChannels } from "./channels.js";
import { createSpotifyAuthWindow } from "../windows/spotifyAuthWindow.js";
import isAuthenticated from "../services/spotifyApi/isAuthenticated.js";
import fetchUserProfile from "../services/spotifyApi/fetchUserProfile.js";
import fetchUserPlaylists from "../services/spotifyApi/fetchUserPlaylists.js";

/**
 * Registers the Spotify API related IPC handlers.
 *
 * @param mainWindow The application's main window.
 */
function registerHandlers(mainWindow: BrowserWindow) {
  ipcMain.handle(IpcChannels.OPEN_SPOTIFY_AUTH_WINDOW, async () => {
    createSpotifyAuthWindow(mainWindow);
  });

  ipcMain.handle(IpcChannels.SPOTIFY_IS_AUTH, async () => isAuthenticated());

  ipcMain.handle(IpcChannels.GET_SPOTIFY_USER_PROFILE, async () =>
    fetchUserProfile()
  );

  ipcMain.handle(IpcChannels.GET_SPOTIFY_USER_PLAYLISTS, async () =>
    fetchUserPlaylists()
  );
}

export { registerHandlers };
