import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";

/**
 * Hook that provides a query to retrieve the current user's Spotify playlists.
 *
 * @returns The query.
 */
export default function useGetUserPlaylists() {
  const { data: isAuthenticated } = useAuthContext();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["spotify-api-playlists"],
    queryFn: async () => {
      const [success, playlists] =
        await window.electronAPI.getSpotifyUserPlaylists();

      if (!success) {
        queryClient.invalidateQueries({
          queryKey: ["spotify-api-is-auth"],
        });
      }

      return playlists;
    },
    enabled: !!isAuthenticated,
  });
}
