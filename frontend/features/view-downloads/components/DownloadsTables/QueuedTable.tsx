import * as Ch from "@chakra-ui/react";
import DownloadsTableCard from "./shared/DownloadsTableCard";
import { useDownloadsSocketContext } from "../../context/DownloadsSocketContext";
import getDownloadTimeAgo from "../../utils/getDownloadTimeAgo";
import PauseDownloadButton from "./shared/PauseDownloadsButton";
import useQueuedDownloads from "../../hooks/useQueuedDownloads";
import {
  DownloadLoopStatusProvider,
  useDownloadLoopStatusContext,
} from "../../context/DownloadLoopStatusContext";
import DownloadsTableColumnHeaderCheckbox from "./shared/DownloadsTableColumnHeaderCheckbox";
import DownloadsTableCellCheckbox from "./shared/DownloadsTableCellCheckbox";
import DownloadsSelectionActionBar from "./shared/DownloadsSelectionActionBar";
import DeleteDownloadsButton from "./shared/DeleteDownloadsButton";

/**
 * Shows a table containing all queued track downloads.
 */
export default function QueuedTable() {
  const _QueuedTable = () => {
    const { queued } = useDownloadsSocketContext();
    const {
      queuedWithEarliestFirst,
      downloadsSelection,
      isDeleting,
      handleDelete,
    } = useQueuedDownloads(queued);
    const { isDownloadLoopPaused } = useDownloadLoopStatusContext();

    return (
      <>
        <DownloadsTableCard
          title="Download Queue"
          status="queued"
          totalItems={queued.length}
          emptyTitle="No Queued Downloads"
          emptyDesc="Queued downloads will appear here."
          actions={[<PauseDownloadButton disabled={isDeleting} />]}
        >
          <Ch.Table.Root>
            <Ch.Table.Header>
              <Ch.Table.Row>
                {isDownloadLoopPaused && (
                  <DownloadsTableColumnHeaderCheckbox
                    downloadsSelection={downloadsSelection}
                  />
                )}
                <Ch.Table.ColumnHeader>Position</Ch.Table.ColumnHeader>
                <Ch.Table.ColumnHeader>Main Artist</Ch.Table.ColumnHeader>
                <Ch.Table.ColumnHeader>Track Name</Ch.Table.ColumnHeader>
                <Ch.Table.ColumnHeader>Codec</Ch.Table.ColumnHeader>
                <Ch.Table.ColumnHeader>Bitrate</Ch.Table.ColumnHeader>
                <Ch.Table.ColumnHeader>Ouput Directory</Ch.Table.ColumnHeader>
                <Ch.Table.ColumnHeader>Queued At</Ch.Table.ColumnHeader>
              </Ch.Table.Row>
            </Ch.Table.Header>
            <Ch.Table.Body>
              <Ch.For each={queuedWithEarliestFirst}>
                {(download, index) => (
                  <Ch.Table.Row
                    key={download.download_id}
                    data-selected={
                      isDownloadLoopPaused
                        ? downloadsSelection.isItemDataSelected(
                            download.download_id
                          )
                        : undefined
                    }
                  >
                    {isDownloadLoopPaused && (
                      <DownloadsTableCellCheckbox
                        download={download}
                        downloadsSelection={downloadsSelection}
                      />
                    )}
                    <Ch.Table.Cell>{index + 1}</Ch.Table.Cell>
                    <Ch.Table.Cell>{download.artist_names[0]}</Ch.Table.Cell>
                    <Ch.TableCell>{download.track_name}</Ch.TableCell>
                    <Ch.Table.Cell>{download.codec}</Ch.Table.Cell>
                    <Ch.Table.Cell>
                      {download.codec === "mp3" && download.bitrate}
                    </Ch.Table.Cell>
                    <Ch.TableCell>{download.download_dir}</Ch.TableCell>
                    <Ch.TableCell>
                      {getDownloadTimeAgo(download.created_at)}
                    </Ch.TableCell>
                  </Ch.Table.Row>
                )}
              </Ch.For>
            </Ch.Table.Body>
          </Ch.Table.Root>
        </DownloadsTableCard>
        <DownloadsSelectionActionBar
          tableStatus="queued"
          downloadsSelection={downloadsSelection}
          open={isDownloadLoopPaused}
        >
          <DeleteDownloadsButton handleDelete={handleDelete} />
        </DownloadsSelectionActionBar>
      </>
    );
  };

  return (
    <DownloadLoopStatusProvider>
      <_QueuedTable />
    </DownloadLoopStatusProvider>
  );
}
