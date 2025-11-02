import type { UseSelectionReturn } from "@/hooks/useSelection";
import getPlural from "@/utils/getPlural";
import * as Ch from "@chakra-ui/react";
import { useState } from "react";
import PlaylistDownloadForm from "./PlaylistDownloadForm";
import { LuDownload } from "react-icons/lu";

export interface PlaylistDownloadDialogProps {
  /**
   * Return value from a useSelection hook call for a selection of playlists.
   */
  playlistSelection: UseSelectionReturn<string>;
}

export default function PlaylistDownloadDialog({
  playlistSelection,
}: PlaylistDownloadDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Ch.Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Ch.Dialog.Trigger asChild>
        <Ch.Button variant="outline">
          Download?
          <LuDownload />
        </Ch.Button>
      </Ch.Dialog.Trigger>
      <Ch.Portal>
        <Ch.Dialog.Backdrop />
        <Ch.Dialog.Positioner>
          <Ch.Dialog.Content>
            <Ch.Dialog.Header>
              <Ch.Dialog.Title>
                Download {playlistSelection.selectionCount}{" "}
                {getPlural("playlist", playlistSelection.selectionCount)}
              </Ch.Dialog.Title>
            </Ch.Dialog.Header>
            <Ch.Dialog.Body>
              <PlaylistDownloadForm />
            </Ch.Dialog.Body>
            <Ch.Dialog.Footer>
              <Ch.Dialog.ActionTrigger asChild>
                <Ch.Button variant="outline">Cancel</Ch.Button>
              </Ch.Dialog.ActionTrigger>
              <Ch.Button>
                Start Download
                <LuDownload />
              </Ch.Button>
            </Ch.Dialog.Footer>
            <Ch.Dialog.CloseTrigger asChild>
              <Ch.CloseButton size="sm" />
            </Ch.Dialog.CloseTrigger>
          </Ch.Dialog.Content>
        </Ch.Dialog.Positioner>
      </Ch.Portal>
    </Ch.Dialog.Root>
  );
}
