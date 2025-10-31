import type { AudioBitrate, AudioCodec } from "./config/audio";

/**
 * Represents artist name metadata.
 */
export type TrackArtistNames = [string, ...string[]];

/**
 * Represents a base interface for a form that has a bitrate field.
 */
export interface FormValuesWithCodecAndBitrate {
  codec: AudioCodec;
  bitrate: AudioBitrate;
}
