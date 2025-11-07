/**
 * Shallow Spotify API user data.
 */
export interface SpotifyUser {
  /**
   * The user's dispaly name.
   */
  display_name: string | null;

  /**
   * The URL of the user's profile picture.
   */
  avatar_url: string | null;

  /**
   * The Spotify user's ID.
   */
  id: string;
}

/**
 * Shallow Spotify API playlist data.
 */
export interface SpotifyPlaylist {
  /**
   * The Spotify playlist's ID.
   */
  id: string;

  /**
   * The name of the playlist.
   */
  name: string;

  /**
   * The username of the playlist owner.
   */
  owner: string;

  /**
   * The total number of tracks in the playlist.
   */
  total_tracks: number;

  /**
   * The URL of the playlist cover image.
   */
  playlist_cover: string;

  /**
   * The URL of the Spotify API endpoint to fetch the playlist's tracks.
   */
  tracks_href: string;
}
