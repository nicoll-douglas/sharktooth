import getAuthHeaders from "./getAuthHeaders";

/**
 * Fetches all items as an array for a paginated dataset from the Spotify API.
 *
 * @param initial The URL of the initial page.
 * @returns The items array.
 */
export default async function fetchAllPages(initial: string) {
  let next = initial;
  let results: any[] = [];

  while (next) {
    const res = await fetch(next, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      return null;
    }

    const body = await res.json();
    results = [...results, ...body.items];
    next = body.next;
  }

  return results;
}
