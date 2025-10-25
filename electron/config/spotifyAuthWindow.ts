import { BrowserWindowConstructorOptions } from "electron";

// configuration for the window where Spotify authentication happens
const spotifyAuthWindow: BrowserWindowConstructorOptions = {
  width: 500,
  height: 600,
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
  },
};

export default spotifyAuthWindow;
