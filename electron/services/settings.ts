import { Conf } from "electron-conf/main";
import { app } from "electron";
import { SettingsKey, type SettingsSchema } from "../../types/shared.js";

const defaultSettings: SettingsSchema = {
  default_download_dir: app.getPath("music"),
};

const settings = new Conf<SettingsSchema>({
  defaults: defaultSettings,
  name: "settings",
});

function resetSettings() {
  settings.reset(...(Object.keys(defaultSettings) as SettingsKey[]));
}

export { settings, resetSettings, defaultSettings };
