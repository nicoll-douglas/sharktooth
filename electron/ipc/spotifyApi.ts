import { BrowserWindow, ipcMain } from "electron";
import { IpcChannel } from "./channels.js";
import { createSpotifyAuthWindow } from "../windows/spotifyAuthWindow.js";
import isAuthenticated from "../services/spotifyApi/isAuthenticated.js";
import fetchUserProfile from "../services/spotifyApi/fetchUserProfile.js";
import fetchUserPlaylists from "../services/spotifyApi/fetchUserPlaylists.js";
import { logMain } from "../services/logger/index.js";

/**
 * Registers the Spotify API related IPC handlers.
 *
 * @param mainWindow The application's main window.
 */
function registerHandlers(mainWindow: BrowserWindow) {
  ipcMain.handle(IpcChannel.OPEN_SPOTIFY_AUTH_WINDOW, async () => {
    logMain.ipc(IpcChannel.OPEN_SPOTIFY_AUTH_WINDOW, false);
    createSpotifyAuthWindow(mainWindow);
  });

  ipcMain.handle(IpcChannel.SPOTIFY_IS_AUTH, async () => {
    logMain.ipc(IpcChannel.SPOTIFY_IS_AUTH, false);
    return isAuthenticated();
  });

  ipcMain.handle(IpcChannel.GET_SPOTIFY_USER_PROFILE, async () => {
    logMain.ipc(IpcChannel.GET_SPOTIFY_USER_PROFILE, false);
    return fetchUserProfile();
  });

  ipcMain.handle(IpcChannel.GET_SPOTIFY_USER_PLAYLISTS, async () => {
    logMain.ipc(IpcChannel.GET_SPOTIFY_USER_PLAYLISTS, false);
    return fetchUserPlaylists();
  });

  logMain.debug("Registered Spotify API related IPC handlers.");
}

export { registerHandlers };
