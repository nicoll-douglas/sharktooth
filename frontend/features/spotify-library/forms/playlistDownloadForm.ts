import type { AudioPlaylistFormat } from "@/config/audio";
import type { FormValuesWithCodecAndBitrate } from "@/types";

/**
 * Represents the form field names and types in the playlist download form.
 */
export interface PlaylistDownloadFormValues
  extends FormValuesWithCodecAndBitrate {
  /**
   * The desired file output type of the playlist download.
   */
  playlistFormat: AudioPlaylistFormat;

  /**
   * Whether to prefill track metadata retrieved from the Spotify API.
   */
  prefillMetadata: boolean;
}
