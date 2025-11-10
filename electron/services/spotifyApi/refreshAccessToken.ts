import { logMain } from "../logger/index.js";
import { CLIENT_ID, TOKEN_URL } from "./constants.js";
import { spotifyTokenStore, resetSpotifyTokenStore } from "./tokenStore.js";

/**
 * Refreshes the access token with the current refresh token if there is one.
 *
 * @returns true if the token was successfully refreshed, false otherwise.
 */
export default async function refreshAccessToken(): Promise<boolean> {
  try {
    const refreshToken = spotifyTokenStore.get("refresh_token");

    if (!refreshToken) {
      logMain.debug(
        "No refresh token in store available for refresh, resetting token store..."
      );

      resetSpotifyTokenStore();

      return false;
    }

    logMain.debug(
      "Requesting a new access token using the current refresh token..."
    );

    const res = await fetch(TOKEN_URL, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const body = await res.json();

    if (!res.ok) {
      logMain.debug(
        "Refresh request got a bad response, resetting token store...",
        {
          status: res.status,
          body,
        }
      );

      resetSpotifyTokenStore();
    } else {
      logMain.debug("Refresh request got an ok response.", {
        status: res.status,
      });

      spotifyTokenStore.set("access_token", body.access_token);
      spotifyTokenStore.set("access_token_expires_in", body.expires_in);

      if (body.refresh_token) {
        spotifyTokenStore.set("refresh_token", body.refresh_token);
      }

      logMain.debug(
        "Access token refreshed successfully, token store was updated with new token data."
      );
    }

    return res.ok;
  } catch (e: any) {
    logMain.debug(
      "Refresh request failed (fetch error), resetting token store..."
    );

    resetSpotifyTokenStore();

    return false;
  }
}
