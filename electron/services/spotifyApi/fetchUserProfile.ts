import { logMain } from "../logger.js";
import { API_URL } from "./constants.js";
import getAuthHeaders from "./getAuthHeaders";
import { resetSpotifyTokenStore } from "./tokenStore.js";
import type { SpotifyUser } from "types/shared.js";

/**
 * Fetches and returns necessary Spotify API profile data for the current user.
 *
 * @returns An array containing a success flag and the user profile data on success or null otherwise.
 */
export default async function fetchUserProfile(): Promise<
  [true, SpotifyUser] | [false, null]
> {
  logMain.debug("Fetching Spotify user profile for current user...");

  const res = await fetch(`${API_URL}/me`, {
    headers: getAuthHeaders(),
  });

  const body = await res.json();

  if (!res.ok) {
    logMain.debug(
      "User profile request got a bad response, resetting token store...",
      {
        status: res.status,
        body,
      }
    );

    resetSpotifyTokenStore();

    return [false, null];
  }

  logMain.debug("User profile request got an ok response.", {
    status: res.status,
  });

  const userData: SpotifyUser = {
    display_name: body.display_name || null,
    avatar_url: body.images?.[0]?.url || null,
    id: body.id,
  };

  return [true, userData];
}
