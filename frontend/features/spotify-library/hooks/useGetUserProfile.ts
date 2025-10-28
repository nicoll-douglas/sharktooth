import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";

export default function useGetUserProfile() {
  const { data: isAuthenticated } = useAuthContext();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["spotify-api-me"],
    queryFn: async () => {
      const [success, userProfile] =
        await window.electronAPI.getSpotifyUserProfile();

      if (!success) {
        queryClient.invalidateQueries({
          queryKey: ["spotify-api-is-auth"],
        });
      }

      return userProfile;
    },
    enabled: !!isAuthenticated,
  });
}
