/**
 * Creates a code verifier to use with the PKCE OAuth flow.
 *
 * @returns The code verifier.
 */
export default function createCodeVerifier(): string {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(64));

  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
