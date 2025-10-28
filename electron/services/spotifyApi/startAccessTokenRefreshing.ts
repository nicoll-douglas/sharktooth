import refreshAccessToken from "./refreshAccessToken.js";
import { spotifyTokenStore } from "./tokenStore.js";

/**
 * Starts the access token refreshing process.
 *
 * @param initialRefresh Whether to perform an initial refresh.
 */
export default async function startAccessTokenRefreshing(
  initialRefresh: boolean = false
) {
  let accessTokenExpiresIn = spotifyTokenStore.get("access_token_expires_in");

  if (initialRefresh) {
    await refreshAccessToken();
  }

  while (accessTokenExpiresIn !== null) {
    const timeout = accessTokenExpiresIn;

    await new Promise((resolve) => setTimeout(resolve, timeout));
    await refreshAccessToken();

    accessTokenExpiresIn = spotifyTokenStore.get("access_token_expires_in");
  }
}
