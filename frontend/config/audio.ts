/**
 * Defines the schema for the audio configuration.
 */
export interface AudioConfig {
  codecs: {
    lossy: string[];
    lossless: string[];
  };
  bitrates: string[];
}

/**
 * The configuration object for audio-related app configurations e.g supported codecs and bitrates.
 */
export const audioConfig = Object.freeze({
  codecs: {
    lossless: ["flac"],
    lossy: ["mp3"],
  },
  bitrates: ["128", "192", "320"],
} as const satisfies AudioConfig);

/**
 * A union of all supported codecs.
 */
export type AudioCodec =
  | (typeof audioConfig.codecs.lossless)[number]
  | (typeof audioConfig.codecs.lossy)[number];

/**
 * A union of all supported bitrates.
 */
export type AudioBitrate = (typeof audioConfig.bitrates)[number];
