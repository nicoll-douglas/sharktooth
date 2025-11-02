/**
 * Defines the schema for the configuration of supported audio values by the application.
 */
export interface AudioConfig {
  /**
   * Audio codecs supported for download.
   */
  codecs: {
    /**
     * Lossy codecs supported for download.
     */
    lossy: string[];

    /**
     * Lossless codecs supported for download.
     */
    lossless: string[];
  };

  /**
   * Audio bitrates supported for download.
   */
  bitrates: string[];

  /**
   * Playlist file formats supported for download.
   */
  playlistFormats: string[];
}

/**
 * The configuration of supported audio values by the application.
 *
 * E.g supported codecs for download.
 */
export const audioConfig = Object.freeze({
  codecs: {
    lossless: ["flac"],
    lossy: ["mp3"],
  },
  bitrates: ["128", "192", "320"],
  playlistFormats: ["m3u8"],
} as const satisfies AudioConfig);

/**
 * A union of all supported codecs for download.
 */
export type AudioCodec =
  | (typeof audioConfig.codecs.lossless)[number]
  | (typeof audioConfig.codecs.lossy)[number];

/**
 * A union of all supported bitrates for download.
 */
export type AudioBitrate = (typeof audioConfig.bitrates)[number];

/**
 * A union of all supported playlist formats for download.
 */
export type AudioPlaylistFormat = (typeof audioConfig.playlistFormats)[number];
