import type { GetDownloadsIsPausedResponse } from "../types";

/**
 * Hits the backend API to check if the download loop is paused.
 *
 * @returns True if it is paused, false otherwise.
 */
export default async function isDownloadLoopPaused(): Promise<boolean> {
  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/downloads/is-paused`;

  const res = await fetch(endpoint);
  const body: GetDownloadsIsPausedResponse = await res.json();

  return body.is_paused;
}
