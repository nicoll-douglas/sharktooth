import type { AudioBitrate, AudioCodec } from "shared/config/audio";

/**
 * Represents a base interface for a form that has a bitrate field.
 */
export interface FormValuesWithCodecAndBitrate {
  codec: AudioCodec;
  bitrate: AudioBitrate;
}
