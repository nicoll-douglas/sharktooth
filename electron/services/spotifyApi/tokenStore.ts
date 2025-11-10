import { Conf } from "electron-conf/main";
import { logMain } from "../logger";

/**
 * Schema for the Spotify API token store on disk.
 */
export interface SpotifyTokenStoreSchema {
  access_token: string | null;
  access_token_expires_in: number | null;
  refresh_token: string | null;
}

/**
 * The default values for the token store.
 */
const defaultSpotifyTokenStore: SpotifyTokenStoreSchema = {
  access_token: null,
  access_token_expires_in: null,
  refresh_token: null,
};

/**
 * Disk store that holds Spotify API tokens.
 */
const spotifyTokenStore = new Conf<SpotifyTokenStoreSchema>({
  defaults: defaultSpotifyTokenStore,
  name: "spotify_tokens",
});

/**
 * Resets the token store to the default values.
 */
function resetSpotifyTokenStore() {
  spotifyTokenStore.reset(
    ...(Object.keys(
      defaultSpotifyTokenStore
    ) as (keyof SpotifyTokenStoreSchema)[])
  );
  spotifyTokenStore.clear();
  spotifyTokenStore.set(defaultSpotifyTokenStore);

  logMain.debug("Reset Spotify token store.");
}

export { defaultSpotifyTokenStore, spotifyTokenStore, resetSpotifyTokenStore };
