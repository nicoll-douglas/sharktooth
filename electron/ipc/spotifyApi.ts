import { BrowserWindow, ipcMain } from "electron";
import { IpcChannels } from "./channels.js";
import { createSpotifyAuthWindow } from "../windows/spotifyAuthWindow.js";

/**
 * Registers the Spotify API related IPC handlers.
 *
 * @param mainWindow The application's main window.
 */
function registerHandlers(mainWindow: BrowserWindow) {
  ipcMain.handle(
    IpcChannels.openSpotifyAuthWindow,
    async (_, authUrl: string) => createSpotifyAuthWindow(authUrl, mainWindow)
  );
}

export { registerHandlers };
