import dotenv from "dotenv";
import path from "path";
import { app, BrowserWindow } from "electron";

const envPath = app.isPackaged
  ? path.join(process.resourcesPath, ".env")
  : path.join(process.cwd(), ".env");

dotenv.config({ path: envPath });

const APP_NAME = String(process.env.VITE_APP_NAME);

app.setName(
  process.env.APP_ENV === "development" ? APP_NAME + "-dev" : APP_NAME
);

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
import { logMain } from "./services/logger/index.js";

app.whenReady().then(async () => {
  logMain.info("Starting application...");

  await startBackend();

  if (process.env.APP_ENV === "development") {
    watchBackend();
  }

  startAccessTokenRefreshing(true);

  const mainWindow = createMainWindow();

  registerSettingsIpcHandlers();
  registerDialogIpcHandlers();
  registerSpotifyApiIpcHandlers(mainWindow);
});

let isQuitting = false;

app.on("before-quit", async (e) => {
  if (isQuitting) return;

  e.preventDefault();
  isQuitting = true;

  logMain.info("Quitting application...");

  await killBackend();
  app.quit();
});

app.on("quit", () => {
  logMain.info("Application quit.");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    logMain.info("All windows closed.");
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    const mainWindow = createMainWindow();

    registerSpotifyApiIpcHandlers(mainWindow);
  }
});
