import type { SpotifyPlaylist } from "shared/types/spotify";
import { API_URL } from "./constants.js";
import fetchAllPages from "./fetchAllPages.js";
import fetchUserProfile from "./fetchUserProfile.js";
import { logMain } from "../logger/index.js";
import { resetSpotifyTokenStore } from "./tokenStore.js";

/**
 * Fetches and returns necessary Spotify API playlist metadata for all of the current user's playlists.
 *
 * @returns An array containing a success flag and the playlist data on success or null otherwise.
 */
export default async function fetchUserPlaylists(): Promise<
  [true, SpotifyPlaylist[]] | [false, null]
> {
  try {
    logMain.debug("Fetching user playlists...");

    const [success, userProfile] = await fetchUserProfile();

    if (!success) {
      logMain.debug(
        "User profile prerequisite to fetch user playlists failed."
      );

      return [false, null];
    }

    const limit = 50;
    const offset = 0;
    const initial = `${API_URL}/users/${userProfile.id}/playlists?limit=${limit}&offset=${offset}`;

    const rawPlaylists = await fetchAllPages(initial);

    if (!rawPlaylists) {
      logMain.debug(
        "Failed to fetch all pages of the user's playlists, resetting token store..."
      );

      resetSpotifyTokenStore();

      return [false, null];
    }

    logMain.debug("Successfully fetched user playlists.");

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
  } catch (e: any) {
    logMain.debug(
      "User playlist request failed (fetch error), resetting token store..."
    );

    resetSpotifyTokenStore();

    return [false, null];
  }
}
