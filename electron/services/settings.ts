import { Conf } from "electron-conf/main";
import { app } from "electron";
import { SettingsKey, type SettingsSchema } from "shared/types/settings";
import { logMain } from "./logger/index.js";

/**
 * The default values for the settings store.
 */
const defaultSettings: SettingsSchema = {
  default_download_dir: app.getPath("music"),
};

/**
 * Disk store that holds the application's settings.
 */
const settings = new Conf<SettingsSchema>({
  defaults: defaultSettings,
  name: "settings",
});

/**
 * Resets the settings store to the default values.
 */
function resetSettings() {
  settings.reset(...(Object.keys(defaultSettings) as SettingsKey[]));
  settings.clear();
  settings.set(defaultSettings);

  logMain.info("Settings were successfully reset.");
}

export { settings, resetSettings, defaultSettings };
