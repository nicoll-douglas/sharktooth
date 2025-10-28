import { ipcMain } from "electron";
import { settings, resetSettings } from "../services/settings.js";
import { IpcChannels } from "./channels.js";
import type { SettingsKey, SettingsValue } from "../../types/shared.js";

/**
 * Registers the settings-related IPC handlers.
 */
function registerHandlers() {
  ipcMain.handle(IpcChannels.GET_SETTING, async (_, key: SettingsKey) =>
    settings.get(key)
  );

  ipcMain.handle(
    IpcChannels.SET_SETTING,
    async (_, key: SettingsKey, value: SettingsValue) => {
      settings.set(key, value);
    }
  );

  ipcMain.handle(IpcChannels.RESET_SETTINGS, async () => {
    resetSettings();
  });
}

export { registerHandlers };
