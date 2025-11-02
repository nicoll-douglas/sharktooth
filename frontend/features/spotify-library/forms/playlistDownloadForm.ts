import type { AudioPlaylistFormat } from "@/config/audio";
import type { FormValuesWithCodecAndBitrate } from "@/types";

export interface PlaylistDownloadFormValues
  extends FormValuesWithCodecAndBitrate {
  playlistFormat: AudioPlaylistFormat;
  prefillMetadata: boolean;
}
