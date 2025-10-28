export interface SettingsSchema {
  default_download_dir: string;
}

export type SettingsKey = keyof SettingsSchema;

export type SettingsValue = SettingsSchema[SettingsKey];

export interface SpotifyUser {
  display_name: string | null;
  avatar_url: string | null;
}

export interface ElectronAPI {
  getSetting: (key: SettingsKey) => Promise<SettingsValue>;

  setSetting: (key: SettingsKey, value: SettingsValue) => Promise<void>;

  resetSettings: () => Promise<void>;

  pickDirectory: (dialogTitle: string) => Promise<string | null>;

  pickImageFile: (dialogTitle: string) => Promise<string | null>;

  openSpotifyAuthWindow: () => Promise<void>;

  onSpotifyAuthComplete: (
    callback: (
      success: boolean,
      errorMsg: string | null
    ) => void | Promise<void>
  ) => void;

  onSpotifyAuthWindowClosed: (callback: () => void | Promise<void>) => void;

  spotifyUserIsAuth: () => Promise<boolean>;

  getSpotifyUserProfile: () => Promise<[true, SpotifyUser] | [false, null]>;
}
