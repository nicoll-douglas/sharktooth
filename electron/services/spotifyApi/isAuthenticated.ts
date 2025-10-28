import { spotifyTokenStore } from "./tokenStore";

/**
 * Returns a boolean flag indicating whether there is a currently authenticated user.
 *
 * @returns The boolean flag.
 */
export default function isAuthenticated() {
  return !!spotifyTokenStore.get("access_token");
}
