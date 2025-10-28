import getAuthHeaders from "./getAuthHeaders";

/**
 * Fetches all pages as an array for a paginated dataset from the Spotify API.
 *
 * @param initial The URL of the initial page
 * @returns The full dataset.
 */
export default async function fetchAllPages(initial: string) {
  let next = initial;
  let results: unknown[] = [];

  while (next) {
    const res = await fetch(next, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      return null;
    }

    const body = await res.json();
    results = [...results, body.items];
    next = body.next;
  }

  return results;
}
