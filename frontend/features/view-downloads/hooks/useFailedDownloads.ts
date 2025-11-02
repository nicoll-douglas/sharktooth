import type { DownloadUpdate } from "../types";
import useDownloadsSelection, {
  type UseDownloadsSelectionReturn,
} from "./useDownloadsSelection";
import restartDownloads from "../services/restartDownloads";
import getPlural from "@/utils/getPlural";
import { toaster } from "@/components/chakra-ui/toaster";
import useDeleteDownloads from "./useDeleteDownloads";

export interface UseFailedDownloadsReturn {
  /**
   * The list of failed downloads sorted by which failed earliest.
   */
  failedWithEarliestFirst: DownloadUpdate[];

  /**
   * Handles the deletion of failed downloads that are selected.
   */
  handleDelete: () => Promise<void>;

  /**
   * Handles the restarting of failed downloads that are selected.
   */
  handleRestart: () => Promise<void>;

  /**
   * A value returned from a useDownloadsSelection hook call.
   */
  downloadsSelection: UseDownloadsSelectionReturn;
}

/**
 * Hook to work with failed downloads.
 *
 * @param failedDownloads The full list of failed downloads.
 * @returns An object containing handlers and utilities.
 */
export default function useFailedDownloads(
  failedDownloads: DownloadUpdate[]
): UseFailedDownloadsReturn {
  const downloadsSelection = useDownloadsSelection(failedDownloads);

  const handleDelete = useDeleteDownloads(downloadsSelection);

  const failedWithEarliestFirst = failedDownloads.sort((a, b) => {
    if (!a.terminated_at || !b.terminated_at) return 0;

    return (
      new Date(a.terminated_at).getTime() - new Date(b.terminated_at).getTime()
    );
  });

  const handleRestart = async () => {
    const res = await restartDownloads(downloadsSelection.selection);

    if (res.status === 200) {
      toaster.create({
        title: `Successfully requeued ${downloadsSelection.selectionCount} ${getPlural("download", downloadsSelection.selectionCount)}.`,
        type: "success",
      });

      downloadsSelection.resetSelection();
    }
  };

  return {
    failedWithEarliestFirst,
    handleDelete,
    handleRestart,
    downloadsSelection,
  };
}
