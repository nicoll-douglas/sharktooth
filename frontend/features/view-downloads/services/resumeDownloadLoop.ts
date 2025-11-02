/**
 * Hits the backend API to resume the download loop.
 */
export default async function resumeDownloadLoop() {
  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/downloads/resume`;

  await fetch(endpoint);
}
