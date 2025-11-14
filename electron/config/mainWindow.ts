import { BrowserWindowConstructorOptions } from "electron";
import path from "path";
import getPlatformIcon from "../windows/getPlatformIcon.js";

/**
 * Configuration for the window where the main application runs.
 */
const mainWindowConfig: BrowserWindowConstructorOptions = {
  width: 1000,
  height: 800,
  show: process.env.APP_ENV !== "development",
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
    preload: path.join(__dirname, "..", "preload", "mainWindow.js"),
    sandbox: false,
  },
  icon:
    process.env.APP_ENV === "development"
      ? path.join(__dirname, "..", "..", "assets", "icons", getPlatformIcon())
      : path.join(process.resourcesPath, "assets", "icons", getPlatformIcon()),
};

export default mainWindowConfig;
