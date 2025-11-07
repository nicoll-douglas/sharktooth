import { ipcMain } from "electron";
import { settings, resetSettings } from "../services/settings.js";
import { IpcChannel } from "./channels.js";
import type { SettingsKey, SettingsValue } from "shared/types/settings";
import { logMain } from "../services/logger/index.js";

/**
 * Registers the settings related IPC handlers.
 */
function registerHandlers() {
  ipcMain.handle(IpcChannel.GET_SETTING, async (_, key: SettingsKey) => {
    logMain.ipc(IpcChannel.GET_SETTING, false, { key });
    return settings.get(key);
  });

  ipcMain.handle(
    IpcChannel.SET_SETTING,
    async (_, key: SettingsKey, value: SettingsValue) => {
      logMain.ipc(IpcChannel.SET_SETTING, false, { key, value });
      settings.set(key, value);
    }
  );

  ipcMain.handle(IpcChannel.RESET_SETTINGS, async () => {
    logMain.ipc(IpcChannel.RESET_SETTINGS, false);
    resetSettings();
  });

  logMain.debug("Registered settings related IPC handlers.");
}

export { registerHandlers };
