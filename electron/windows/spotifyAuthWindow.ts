import { BrowserWindow } from "electron";
import authWindowConfig from "../config/spotifyAuthWindow.js";
import { IpcChannel } from "../ipc/channels.js";
import createCodeVerifier from "../services/spotifyApi/createCodeVerifier.js";
import createAuthUrl from "../services/spotifyApi/createAuthUrl.js";
import exchangeAuthCodeForAccessToken from "../services/spotifyApi/exchangeAuthCodeForAccessToken.js";
import { REDIRECT_URI } from "../services/spotifyApi/constants.js";
import startAccessTokenRefreshing from "../services/spotifyApi/startAccessTokenRefreshing.js";
import windowManager from "./windowManager.js";

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
      const searchParams = new URL(details.url).searchParams;
      const authCode = searchParams.get("code");
      const error = searchParams.get("error");

      authWindow.close();
      callback({ cancel: true });

      if (!authCode) {
        mainWindow.webContents.send(
          IpcChannel.SPOTIFY_AUTH_COMPLETE,
          false,
          error
        );

        return;
      }

      const status = await exchangeAuthCodeForAccessToken(
        codeVerifier,
        authCode
      );

      if (status < 400) {
        mainWindow.webContents.send(
          IpcChannel.SPOTIFY_AUTH_COMPLETE,
          true,
          null
        );

        startAccessTokenRefreshing();

        return;
      }

      mainWindow.webContents.send(
        IpcChannel.SPOTIFY_AUTH_COMPLETE,
        false,
        null
      );

      return;
    }
  );

  authWindow.on("closed", () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;

    mainWindow.webContents.send(IpcChannel.SPOTIFY_AUTH_WINDOW_CLOSED);
  });

  authWindow.loadURL(authUrl);
}

export { createSpotifyAuthWindow };
