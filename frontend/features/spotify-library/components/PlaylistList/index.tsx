import * as Ch from "@chakra-ui/react";
import useGetUserPlaylists from "../../hooks/useGetUserPlaylists";
import PlaylistCheckboxCard from "./PlaylistCheckboxCard";
import useIsAuthenticated from "../../hooks/useIsAuthenticated";
import PlaylistSelectionActionBar from "./PlaylistSelectionActionBar";
import useSelection from "@/hooks/useSelection";
import PlaylistDownloadDialog from "./PlaylistDownloadDialog";
import { PlaylistDownloadFormProvider } from "../../context/PlaylistDownloadFormContext";

export default function PlaylistList() {
  const _PlaylistList = () => {
    const { data: playlists, isLoading: playlistsLoading } =
      useGetUserPlaylists();
    const { data: isAuth } = useIsAuthenticated();
    const playlistSelection = useSelection(
      playlists?.map((playlist) => playlist.id) || []
    );

    if (playlists === null || !isAuth) return;

    const isLoading = playlists === undefined || playlistsLoading;

    return (
      <Ch.Card.Root size={"sm"}>
        <Ch.Card.Header>
          {isLoading ? (
            <Ch.SkeletonText noOfLines={2} />
          ) : (
            <Ch.Flex align={"start"}>
              <Ch.Stack>
                <Ch.Card.Title>Playlists</Ch.Card.Title>
                <Ch.Card.Description>
                  {playlists.length} total
                </Ch.Card.Description>
              </Ch.Stack>

              <Ch.Spacer />

              {playlists.length > 0 && (
                <Ch.Checkbox.Root
                  checked={playlistSelection.allChecked}
                  onCheckedChange={playlistSelection.onAllCheckedChange}
                  size={"sm"}
                >
                  <Ch.Checkbox.Label>Select all</Ch.Checkbox.Label>
                  <Ch.Checkbox.HiddenInput />
                  <Ch.Checkbox.Control />
                </Ch.Checkbox.Root>
              )}
            </Ch.Flex>
          )}
        </Ch.Card.Header>
        <Ch.Card.Body>
          <Ch.Stack gap={"2"}>
            {isLoading ? (
              <Ch.For each={Array.from({ length: 3 }, (_, i) => i)}>
                {(index) => <Ch.Skeleton height={"20"} key={index} />}
              </Ch.For>
            ) : (
              <Ch.For each={playlists}>
                {(playlist) => (
                  <PlaylistCheckboxCard
                    key={playlist.id}
                    playlist={playlist}
                    playlistSelection={playlistSelection}
                  />
                )}
              </Ch.For>
            )}
          </Ch.Stack>
          <PlaylistSelectionActionBar playlistSelection={playlistSelection}>
            <PlaylistDownloadDialog playlistSelection={playlistSelection} />
          </PlaylistSelectionActionBar>
        </Ch.Card.Body>
      </Ch.Card.Root>
    );
  };

  return (
    <PlaylistDownloadFormProvider>
      <_PlaylistList />
    </PlaylistDownloadFormProvider>
  );
}
