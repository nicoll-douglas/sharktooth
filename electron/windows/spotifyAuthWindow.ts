import { BrowserWindow } from "electron";
import authWindowConfig from "../config/spotifyAuthWindow";

/**
 * Create the Spotify authentication window using the respective configuration.
 */
function createSpotifyAuthWindow(authUrl: string) {
  const authWindow = new BrowserWindow(authWindowConfig);

  authWindow.webContents.on("will-redirect", (_, url) => {
    if (url.startsWith("")) {
      const searchParams = new URL(url).searchParams;
      const code = searchParams.get("code");
      const error = searchParams.get("error");
      console.log("code:", code);
      console.log("error", error);

      authWindow.close();
    }
  });

  authWindow.loadURL(authUrl);
}

export { createSpotifyAuthWindow };
