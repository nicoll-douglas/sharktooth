import { API_URL } from "./constants.js";
import getAuthHeaders from "./getAuthHeaders";
import { resetSpotifyTokenStore } from "./tokenStore.js";
import type { SpotifyUser } from "types/shared.js";

/**
 * Fetches the user's profile from the Spotify API.
 *
 * @returns An array containing a success flag and the user profile data on success or null otherwise.
 */
export default async function fetchUserProfile(): Promise<
  [true, SpotifyUser] | [false, null]
> {
  try {
    const res = await fetch(`${API_URL}/me`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      console.log("fetchUserProfile: req not ok, resetting store.");

      resetSpotifyTokenStore();

      return [false, null];
    }

    const body = await res.json();

    const userData: SpotifyUser = {
      display_name: body.display_name || null,
      avatar_url: body.images?.[0]?.url || null,
      id: body.id,
    };

    return [true, userData];
  } catch (e: any) {
    console.log(e);
    resetSpotifyTokenStore();

    return [false, null];
  }
}
