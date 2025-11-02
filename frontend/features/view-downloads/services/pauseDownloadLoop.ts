/**
 * Hits the backend API to pause the download loop.
 */
export default async function pauseDownloadLoop() {
  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/downloads/pause`;

  await fetch(endpoint);
}
