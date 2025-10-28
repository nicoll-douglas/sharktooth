/**
 * Creates a code challenge to be used with the PKCE OAuth flow.
 *
 * @param codeVerifier The code verifier.
 * @returns The code challenge.
 */
export default async function createCodeChallenge(
  codeVerifier: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);

  const base64url = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return base64url;
}
