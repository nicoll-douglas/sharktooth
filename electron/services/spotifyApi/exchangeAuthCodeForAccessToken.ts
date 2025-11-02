import { CLIENT_ID, REDIRECT_URI, TOKEN_URL } from "./constants.js";
import { spotifyTokenStore } from "./tokenStore.js";

/**
 * Attempts to exchange an auth code received from an authorization request for an access token and refresh token.
 *
 * Received tokens will be saved in the token store.
 *
 * @param codeVerifier The code verifier used to create the code challenge used in the authorization request.
 * @param authCode The auth code received.
 * @returns The status code of the HTTP request response.
 */
export default async function exchangeAuthCodeForAccessToken(
  codeVerifier: string,
  authCode: string
): Promise<number> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: codeVerifier,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (res.ok) {
    const body = await res.json();

    spotifyTokenStore.set("access_token", body.access_token);
    spotifyTokenStore.set("refresh_token", body.refresh_token);
    spotifyTokenStore.set("access_token_expires_in", body.expires_in);
  }

  return res.status;
}
