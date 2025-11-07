import type {
  AudioBitrate,
  AudioCodec,
  AudioPlaylistFormat,
} from "shared/config/audio";

/**
 * Represents the reponses that may be returned from a get Spotify API auth URL backend API request.
 */
export interface GetSpotifyApiAuthUrlResponse {
  status: 200;
  body: {
    auth_url: string;
  };
}

/**
 * Represents the request body structure that must be sent with a post Spotify API auth code API request.
 */
export interface PostSpotifyApiAuthCodeRequest {
  auth_code: string;
}

export interface SpotifyPlaylistDownloadRequest {
  prefill_metadata: boolean;
  playlist_format: AudioPlaylistFormat;
  codec: AudioCodec;
  bitrate: AudioBitrate;
}
