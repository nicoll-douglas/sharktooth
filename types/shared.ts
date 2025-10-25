export interface UserSettings {
  default_download_dir: string;
}

export type SpotifyAuthResult =
  | {
      code: string;
      error: null;
    }
  | {
      code: null;
      error: string;
    };

export interface ElectronAPI {
  getSettings: () => Promise<UserSettings | null>;

  updateSettings: (updatedSettings: Partial<UserSettings>) => Promise<boolean>;

  pickDirectory: (dialogTitle: string) => Promise<string | null>;

  pickImageFile: (dialogTitle: string) => Promise<string | null>;

  restoreSettings: () => Promise<boolean>;

  openSpotifyAuthWindow: (authUrl: string) => Promise<void>;

  onSpotifyApiRedirect: (
    callback: (authResult: SpotifyAuthResult) => void | Promise<void>
  ) => void;
}
