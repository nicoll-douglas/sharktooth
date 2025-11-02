import { BrowserWindow } from "electron";
import mainWindowConfig from "../config/mainWindow.js";
import path from "path";
import { logMain } from "../services/logger/index.js";
import windowManager from "./windowManager.js";

/**
 * Creates the main application window with the respective configuration.
 *
 * @returns The window.
 */
function createMainWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow(mainWindowConfig);

  mainWindow.on("closed", () => {
    logMain.info("Main window closed, closing all windows...");
    windowManager.closeAll();
  });

  windowManager.register(mainWindow);

  if (process.env.APP_ENV === "development") {
    mainWindow.once("ready-to-show", () => {
      mainWindow.showInactive();
      mainWindow.minimize();
    });

    const url = String(process.env.VITE_APP_URL);
    mainWindow.loadURL(url);

    logMain.info("Created main window.", { url });
  } else {
    const filename = path.join(__dirname, "../../frontend/index.html");
    mainWindow.loadFile(filename);

    logMain.info("Created main window", { filename });
  }

  return mainWindow;
}

export { createMainWindow };
