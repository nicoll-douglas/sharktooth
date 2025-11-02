import { ipcMain } from "electron";
import { settings, resetSettings } from "../services/settings.js";
import { IpcChannel } from "./channels.js";
import type { SettingsKey, SettingsValue } from "../../types/shared.js";
import { logMain } from "../services/logger.js";

/**
 * Registers the settings related IPC handlers.
 */
function registerHandlers() {
  ipcMain.handle(IpcChannel.GET_SETTING, async (_, key: SettingsKey) =>
    settings.get(key)
  );

  ipcMain.handle(
    IpcChannel.SET_SETTING,
    async (_, key: SettingsKey, value: SettingsValue) => {
      settings.set(key, value);
    }
  );

  ipcMain.handle(IpcChannel.RESET_SETTINGS, async () => {
    resetSettings();
  });

  logMain.debug("Registered settings related IPC handlers.");
}

export { registerHandlers };
