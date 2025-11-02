import * as Ch from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { UseSelectionReturn } from "@/hooks/useSelection";
import getPlural from "@/utils/getPlural";

export interface PlaylistSelectionActionBar {
  /**
   * A value returned from a useDownloadsSelection hook call.
   */
  playlistSelection: UseSelectionReturn<string>;

  /**
   * Children i.e the actions buttons for the action bar.
   */
  children: ReactNode;
}

/**
 * An action bar that will contain actions for managing a selection of playlists.
 */
export default function PlaylistSelectionActionBar({
  playlistSelection,
  children,
}: PlaylistSelectionActionBar) {
  return (
    <Ch.ActionBar.Root open={playlistSelection.hasSelection}>
      <Ch.Portal>
        <Ch.ActionBar.Positioner>
          <Ch.ActionBar.Content>
            <Ch.ActionBar.SelectionTrigger>
              {playlistSelection.selectionCount}{" "}
              {getPlural("playlist", playlistSelection.selectionCount)} selected
            </Ch.ActionBar.SelectionTrigger>
            <Ch.ActionBar.Separator />
            {children}
          </Ch.ActionBar.Content>
        </Ch.ActionBar.Positioner>
      </Ch.Portal>
    </Ch.ActionBar.Root>
  );
}
