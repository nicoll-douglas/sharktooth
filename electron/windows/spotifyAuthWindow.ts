import { BrowserWindow, ipcMain } from "electron";
import authWindowConfig from "../config/spotifyAuthWindow.js";
import { IpcChannel } from "../ipc/channels.js";
import createCodeVerifier from "../services/spotifyApi/createCodeVerifier.js";
import createAuthUrl from "../services/spotifyApi/createAuthUrl.js";
import exchangeAuthCodeForAccessToken from "../services/spotifyApi/exchangeAuthCodeForAccessToken.js";
import { REDIRECT_URI } from "../services/spotifyApi/constants.js";
import startAccessTokenRefreshing from "../services/spotifyApi/startAccessTokenRefreshing.js";
import windowManager from "./windowManager.js";
import { logMain } from "../services/logger/index.js";

/**
 * Create the Spotify authentication window using the respective configuration.
 *
 * @param authUrl The Spotify API auth URL.
 * @param mainWindow The main window of the application.
 */
async function createSpotifyAuthWindow(mainWindow: BrowserWindow) {
  const authWindow = new BrowserWindow(authWindowConfig);
  const codeVerifier = createCodeVerifier();
  const authUrl = await createAuthUrl(codeVerifier);
  const filter = { urls: [`${REDIRECT_URI}*`] };

  windowManager.register(authWindow);

  authWindow.webContents.session.webRequest.onBeforeRequest(
    filter,
    async (details, callback) => {
      logMain.debug("Redirect received in Spotify authentication window.", {
        url: details.url,
        method: details.method,
      });

      const searchParams = new URL(details.url).searchParams;
      const authCode = searchParams.get("code");
      const error = searchParams.get("error");

      authWindow.close();
      callback({ cancel: true });

      if (!authCode) {
        logMain.debug("Failed to receive authentication code.", {
          error,
        });

        mainWindow.webContents.send(
          IpcChannel.SPOTIFY_AUTH_COMPLETE,
          false,
          error
        );

        logMain.ipc(IpcChannel.SPOTIFY_AUTH_COMPLETE, true, {
          success: false,
          errorMsg: error,
        });

        return;
      }

      logMain.debug("Successfully obtained authorization code.");

      const status = await exchangeAuthCodeForAccessToken(
        codeVerifier,
        authCode
      );

      const success = status < 400;

      mainWindow.webContents.send(
        IpcChannel.SPOTIFY_AUTH_COMPLETE,
        success,
        null
      );

      logMain.ipc(IpcChannel.SPOTIFY_AUTH_COMPLETE, true, {
        success,
        errorMsg: null,
      });

      if (success) {
        startAccessTokenRefreshing();
      }

      return;
    }
  );

  authWindow.on("closed", () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;

    logMain.info("Spotify authentication window closed.");

    mainWindow.webContents.send(IpcChannel.SPOTIFY_AUTH_WINDOW_CLOSED);

    logMain.ipc(IpcChannel.SPOTIFY_AUTH_WINDOW_CLOSED, true);
  });

  authWindow.loadURL(authUrl);

  logMain.info("Created Spotify authentication window.", { url: authUrl });
}

export { createSpotifyAuthWindow };
