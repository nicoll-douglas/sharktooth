import { MusicBrainzApi } from "musicbrainz-api";

const musicBrainzApi = new MusicBrainzApi({
  appName: import.meta.env.VITE_APP_NAME,
  appVersion: import.meta.env.VITE_APP_VERSION,
  appContactInfo: import.meta.env.VITE_APP_CONTACT,
});
