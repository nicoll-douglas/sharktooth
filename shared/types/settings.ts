/**
 * Schema for the application's settings store.
 */
export interface SettingsSchema {
  /**
   * The path of the default directory to store downloads in.
   */
  default_download_dir: string;
}

/**
 * A key in the application's settings store.
 */
export type SettingsKey = keyof SettingsSchema;

/**
 * A value in the application's settings store.
 */
export type SettingsValue = SettingsSchema[SettingsKey];
