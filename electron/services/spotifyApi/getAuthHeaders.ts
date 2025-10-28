import { spotifyTokenStore } from "./tokenStore.js";

/**
 * Gets the authorization headers necessary for Spotify API requests.
 *
 * @returns The headers.
 */
export default function getAuthHeaders() {
  return {
    Authorization: `Bearer ${spotifyTokenStore.get("access_token")}`,
  };
}
