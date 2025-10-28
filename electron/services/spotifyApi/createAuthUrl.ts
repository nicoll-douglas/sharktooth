import {
  AUTH_URL,
  CLIENT_ID,
  REDIRECT_URI,
  WANTED_SCOPES,
} from "./constants.js";
import createCodeChallenge from "./createCodeChallenge.js";

/**
 * Creates the Spotify auth URL for the PKCE OAuth flow.
 *
 * @param codeVerifier The code verifier to use.
 * @returns The auth URL.
 */
export default async function createAuthUrl(
  codeVerifier: string
): Promise<string> {
  const codeChallenge = await createCodeChallenge(codeVerifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: WANTED_SCOPES,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  return `${AUTH_URL}?${params.toString()}`;
}
