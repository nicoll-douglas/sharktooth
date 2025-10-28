import { Conf } from "electron-conf/main";

interface SpotifyTokenStoreSchema {
  access_token: string | null;
  access_token_expires_in: number | null;
  refresh_token: string | null;
}

const defaultSpotifyTokenStore: SpotifyTokenStoreSchema = {
  access_token: null,
  access_token_expires_in: null,
  refresh_token: null,
};

const spotifyTokenStore = new Conf<SpotifyTokenStoreSchema>({
  defaults: defaultSpotifyTokenStore,
  name: "spotify_tokens",
});

function resetSpotifyTokenStore() {
  spotifyTokenStore.reset(
    ...(Object.keys(
      defaultSpotifyTokenStore
    ) as (keyof SpotifyTokenStoreSchema)[])
  );
}

export {
  SpotifyTokenStoreSchema,
  defaultSpotifyTokenStore,
  spotifyTokenStore,
  resetSpotifyTokenStore,
};
