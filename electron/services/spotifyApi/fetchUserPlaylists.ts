import { API_URL } from "./constants";
import fetchAllPages from "./fetchAllPages";
import fetchUserProfile from "./fetchUserProfile";

export default async function fetchUserPlaylists(): Promise<
  [true, unknown[]] | [false, null]
> {
  const [success, userProfile] = await fetchUserProfile();

  if (!success) {
    return [false, null];
  }

  const limit = 50;
  const offset = 0;
  const initial = `${API_URL}/users/${userProfile.id}/playlists?limit=${limit}&offset=${offset}`;

  const playlists = await fetchAllPages(initial);

  return playlists ? [true, playlists] : [false, null];
}
