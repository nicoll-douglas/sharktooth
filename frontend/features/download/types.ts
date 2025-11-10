import type { NewDownload } from "shared/types/download";

/**
 * Represents a YouTube video search result retrieved from the backend API.
 */
export interface DownloadSearchResult {
  /**
   * The title of the video.
   */
  title: string | null;

  /**
   * The channel of the video.
   */
  channel: string | null;

  /**
   * The webpage URL of the video.
   */
  url: string;

  /**
   * The duration of the video in seconds.
   */
  duration: number | null;

  /**
   * A URL of the video's thumbnail.
   */
  thumbnail: string | null;
}

/**
 * Represents the URL query parameters that must be sent with a downloads search backend API request.
 */
export interface GetDownloadsSearchRequest {
  /**
   * The name of a track.
   */
  track_name: string;

  /**
   * The main artist associated with the track.
   */
  main_artist: string;
}

/**
 * Represents the various reponses that may be returned from a downloads search backend API request.
 */
export type GetDownloadsSearchResponse =
  | {
      status: 200;
      body: {
        results: DownloadSearchResult[];
      };
    }
  | {
      status: 400;
      body: {
        parameter: string;
        message: string;
      };
    }
  | {
      status: 500;
      body: {
        message: string;
      };
    };

/**
 * Represents the request body structure that must be sent with a track download backend API request.
 */
export interface PostDownloadsRequest {
  /**
   * A list of downloads.
   */
  downloads: NewDownload[];
}

/**
 * Represents the various reponses that may be returned from a track download backend API request.
 */
export type PostDownloadsResponse =
  | {
      status: 200;
      body: {
        download_ids: number[];
        message: string;
      };
    }
  | {
      status: 400;
      body: {
        field: string;
        message: string;
        item_index: number;
      };
    };
