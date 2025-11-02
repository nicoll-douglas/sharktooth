import { useState } from "react";
import { toaster } from "@/components/chakra-ui/toaster";
import { useQueryClient } from "@tanstack/react-query";

export interface UseSpotifyAuthWindowReturn {
  /**
   * Whether the Spotify authentication window is open.
   */
  isWindowOpen: boolean;

  /**
   * Handler to open the authentication window.
   */
  handleWindowOpen: () => Promise<void>;
}

/**
 * Hook that provides utilities to work with the Spotify authentication window and handles the auth flow.
 *
 * @returns The utilities.
 */
export default function useSpotifyAuthWindow(): UseSpotifyAuthWindowReturn {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleWindowOpen = async () => {
    setIsWindowOpen(true);

    await window.electronAPI.openSpotifyAuthWindow();
  };

  window.electronAPI.onSpotifyAuthComplete((success, errorMsg) => {
    if (!success) {
      toaster.create({
        title: `Authentication error occurred${errorMsg ? ": " + errorMsg : ""}`,
        type: "error",
      });

      return;
    }

    queryClient.invalidateQueries({ queryKey: ["spotify-api-is-auth"] });

    toaster.create({
      title: "Successfully authenticated.",
      type: "success",
    });
  });

  window.electronAPI.onSpotifyAuthWindowClosed(() => {
    setIsWindowOpen(false);
  });

  return { isWindowOpen, handleWindowOpen };
}
