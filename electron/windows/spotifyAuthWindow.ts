import { BrowserWindow } from "electron";
import authWindowConfig from "../config/spotifyAuthWindow.js";
import { IpcChannels } from "../ipc/channels.js";

/**
 * Create the Spotify authentication window using the respective configuration.
 *
 * @param authUrl The Spotify API auth URL.
 * @param mainWindow The main window of the application.
 */
function createSpotifyAuthWindow(authUrl: string, mainWindow: BrowserWindow) {
  const authWindow = new BrowserWindow(authWindowConfig);

  authWindow.webContents.on("will-redirect", (event, url) => {
    if (url.startsWith(String(process.env.SPOTIFY_REDIRECT_URI))) {
      event.preventDefault();

      const searchParams = new URL(url).searchParams;
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      if (code) {
        mainWindow.webContents.send(IpcChannels.spotifyApiRedirect, {
          code,
          error: null,
        });
      } else if (error) {
        mainWindow.webContents.send(IpcChannels.spotifyApiRedirect, {
          code: null,
          error,
        });
      }

      authWindow.close();
    }
  });

  authWindow.loadURL(authUrl);
}

export { createSpotifyAuthWindow };
