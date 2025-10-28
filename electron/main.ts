import dotenv from "dotenv";
dotenv.config();

import { app, BrowserWindow } from "electron";
import { createMainWindow } from "./windows/mainWindow.js";
import {
  startBackend,
  killBackend,
  watchBackend,
} from "./processes/backend.js";
import { registerHandlers as registerSettingsIpcHandlers } from "./ipc/settings.js";
import { registerHandlers as registerDialogIpcHandlers } from "./ipc/dialog.js";
import { registerHandlers as registerSpotifyApiIpcHandlers } from "./ipc/spotifyApi.js";
import startAccessTokenRefreshing from "./services/spotifyApi/startAccessTokenRefreshing.js";

app.whenReady().then(() => {
  startBackend();

  if (process.env.APP_ENV === "development") {
    watchBackend();
  }

  startAccessTokenRefreshing(true);

  const mainWindow = createMainWindow();

  registerSettingsIpcHandlers();
  registerDialogIpcHandlers();
  registerSpotifyApiIpcHandlers(mainWindow);
});

app.on("will-quit", () => {
  killBackend();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    const mainWindow = createMainWindow();

    registerSpotifyApiIpcHandlers(mainWindow);
  }
});
