import * as Ch from "@chakra-ui/react";
import type { SpotifyPlaylist } from "types/shared";
import type { UseSelectionReturn } from "@/hooks/useSelection";

export interface PlaylistCheckboxCardProps {
  /**
   * A value returned from a useSelection hook call for a selection of playlists.
   */
  playlistSelection: UseSelectionReturn<string>;

  /**
   * The Spotify playlist data that the checkbox card renders and uses.
   */
  playlist: SpotifyPlaylist;
}

/**
 * Represents a checkbox card to select a playlist.
 */
export default function PlaylistCheckboxCard({
  playlistSelection,
  playlist,
}: PlaylistCheckboxCardProps) {
  return (
    <Ch.CheckboxCard.Root
      aria-label="Select playlist"
      checked={playlistSelection.isItemChecked(playlist.id)}
      onCheckedChange={playlistSelection.onItemCheckedChange(playlist.id)}
      variant={"surface"}
    >
      <Ch.CheckboxCard.HiddenInput />
      <Ch.CheckboxCard.Control>
        <Ch.CheckboxCard.Content>
          <Ch.HStack gap={"4"} align={"start"}>
            <Ch.Image
              rounded={"sm"}
              height={50}
              width={50}
              src={playlist.playlist_cover}
              alt={playlist.name}
            />
            <Ch.Stack>
              <Ch.CheckboxCard.Label>{playlist.name}</Ch.CheckboxCard.Label>
              <Ch.CheckboxCard.Description>
                <Ch.HStack gap={"2"}>
                  {playlist.owner}
                  <Ch.Separator orientation={"vertical"} height={"4"} />
                  {playlist.total_tracks} tracks
                </Ch.HStack>
              </Ch.CheckboxCard.Description>
            </Ch.Stack>
          </Ch.HStack>
        </Ch.CheckboxCard.Content>
        <Ch.CheckboxCard.Indicator />
      </Ch.CheckboxCard.Control>
    </Ch.CheckboxCard.Root>
  );
}
