import { logMain } from "../logger.js";
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
  logMain.debug("Started access token refreshing.");

  let accessTokenExpiresIn = spotifyTokenStore.get("access_token_expires_in");

  if (initialRefresh) {
    await refreshAccessToken();
  }

  while (accessTokenExpiresIn !== null) {
    const timeoutSecs = 0.9 * accessTokenExpiresIn;
    const timeoutMillisecs = timeoutSecs * 1000;

    logMain.debug(
      `Waiting ${Math.floor(timeoutSecs)} seconds before next access token refresh.`
    );

    await new Promise((resolve) => setTimeout(resolve, timeoutMillisecs));
    await refreshAccessToken();

    accessTokenExpiresIn = spotifyTokenStore.get("access_token_expires_in");
  }

  logMain.debug("Ended access token refreshing.");
}
