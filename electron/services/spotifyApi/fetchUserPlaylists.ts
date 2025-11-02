import { SpotifyPlaylist } from "types/shared";
import { API_URL } from "./constants";
import fetchAllPages from "./fetchAllPages";
import fetchUserProfile from "./fetchUserProfile";

/**
 * Fetches and returns necessary Spotify API playlist metadata for all of the current user's playlists.
 *
 * @returns An array containing a success flag and the playlist data on success or null otherwise.
 */
export default async function fetchUserPlaylists(): Promise<
  [true, SpotifyPlaylist[]] | [false, null]
> {
  const [success, userProfile] = await fetchUserProfile();

  if (!success) {
    return [false, null];
  }

  const limit = 50;
  const offset = 0;
  const initial = `${API_URL}/users/${userProfile.id}/playlists?limit=${limit}&offset=${offset}`;

  const rawPlaylists = await fetchAllPages(initial);

  if (!rawPlaylists) return [false, null];

  const playlists = rawPlaylists.map(
    (playlist): SpotifyPlaylist => ({
      id: playlist.id,
      name: playlist.name,
      owner: playlist.owner.display_name,
      total_tracks: playlist.tracks.total,
      tracks_href: playlist.tracks.href,
      playlist_cover: playlist.images[0].url,
    })
  );

  return [true, playlists];
}
