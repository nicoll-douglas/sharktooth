import type {
  PostDownloadsResponse,
  PostDownloadsRequest,
  NewDownload,
} from "../types";

/**
 * Hits the backend API to queue downloads.
 *
 * @param downloads The downloads to queue.
 * @returns The request response.
 */
export default async function queueDownloads(
  downloads: NewDownload[]
): Promise<PostDownloadsResponse> {
  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/downloads`;
  const requestBody: PostDownloadsRequest = {
    downloads,
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const body = await res.json();

  return {
    status: res.status as PostDownloadsResponse["status"],
    body,
  };
}
