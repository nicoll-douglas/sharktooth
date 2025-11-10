import type { AudioCodec, AudioBitrate } from "../config/audio";

/**
 * Represents artist name metadata.
 */
export type TrackArtistNames = [string, ...string[]];

/**
 * Represents track release date metadata.
 */
export type TrackReleaseDate =
  | {
      year: number;
      month: null;
      day: null;
    }
  | {
      year: number;
      month: number;
      day: number | null;
    };

/**
 * Represents track download data that will be send to the backend to download.
 */
export interface NewDownload {
  /**
   * The artist name metadata to use for the track.
   */
  artist_names: TrackArtistNames;

  /**
   * The name of the track.
   */
  track_name: string;

  /**
   * The album name of the track.
   */
  album_name: string | null;

  /**
   * The audio codec to be used for the download.
   */
  codec: AudioCodec;

  /**
   * The audio bitrate to be used for the download.
   */
  bitrate: AudioBitrate;

  /**
   * The track number metadata to use for the track.
   */
  track_number: number | null;

  /**
   * The disc number metadata to use for the track.
   */
  disc_number: number | null;

  /**
   * The release date metadata to use for the track.
   */
  release_date: TrackReleaseDate | null;

  /**
   * The source URL to use for the download.
   */
  url: string;

  /**
   * The target save directory of the download.
   */
  download_dir: string;

  /**
   * A file path to an image file to use for album cover metadata.
   */
  album_cover_path: string | null;
}
