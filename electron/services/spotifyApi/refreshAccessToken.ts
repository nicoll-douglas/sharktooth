import { CLIENT_ID, TOKEN_URL } from "./constants.js";
import { spotifyTokenStore, resetSpotifyTokenStore } from "./tokenStore.js";
import { AuthCodeExchangeResponse } from "./types.js";

/**
 * Refreshes the access token with the current refresh token if there is one.
 *
 * @returns true if the token was successfully refreshed, false otherwise.
 */
export default async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = spotifyTokenStore.get("refresh_token");

  if (!refreshToken) {
    resetSpotifyTokenStore();

    return false;
  }

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

  if (!res.ok) {
    resetSpotifyTokenStore();
    return false;
  }

  const body: AuthCodeExchangeResponse = await res.json();

  spotifyTokenStore.set("access_token", body.access_token);
  spotifyTokenStore.set("access_token_expires_in", body.expires_in);

  return true;
}
