import * as Ch from "@chakra-ui/react";
import { FaSpotify } from "react-icons/fa";
import useSpotifyAuthWindow from "../hooks/useSpotifyAuthWindow";
import { useAuthContext } from "../context/AuthContext";

/**
 * Represents a card that prompts the user to authenticate with the Spotify API.
 */
export default function AuthPromptCard() {
  const { isWindowOpen, handleWindowOpen } = useSpotifyAuthWindow();
  const { data: isAuthenticated, isLoading: authLoading } = useAuthContext();

  if (isAuthenticated || authLoading) return;

  return (
    <Ch.Card.Root size={"sm"}>
      <Ch.Card.Header>
        <Ch.Card.Title>Authenticate with Spotify</Ch.Card.Title>
      </Ch.Card.Header>

      <Ch.Card.Body>
        <Ch.Stack align={"start"} gap={"4"}>
          <Ch.Text>
            {import.meta.env.VITE_APP_NAME} allows you to import and download
            your Spotify playlists. Authenticate with Spotify to enable this!
          </Ch.Text>
          <Ch.Button
            variant={"outline"}
            colorPalette={"green"}
            onClick={handleWindowOpen}
            disabled={isWindowOpen}
          >
            <FaSpotify />
            Authenticate
          </Ch.Button>
        </Ch.Stack>
      </Ch.Card.Body>
    </Ch.Card.Root>
  );
}
