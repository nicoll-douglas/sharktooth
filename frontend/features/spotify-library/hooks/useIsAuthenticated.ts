import { useQuery } from "@tanstack/react-query";

/**
 * Hook to get Spotify API authentication status for the current user via a query.
 *
 * @returns The query.
 */
export default function useIsAuthenticated() {
  return useQuery({
    queryKey: ["spotify-api-is-auth"],
    queryFn: async () => window.electronAPI.spotifyUserIsAuth(),
  });
}
