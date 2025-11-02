import { DownloadsSocketProvider } from "../../context/DownloadsSocketContext";
import CompletedTable from "./CompletedTable";
import DownloadingTable from "./DownloadingTable";
import QueuedTable from "./QueuedTable";
import FailedTable from "./FailedTable";

/**
 * Shows all downloads tables with real-time updates.
 */
export default function DownloadsTables() {
  return (
    <DownloadsSocketProvider>
      <DownloadingTable />
      <QueuedTable />
      <FailedTable />
      <CompletedTable />
    </DownloadsSocketProvider>
  );
}
