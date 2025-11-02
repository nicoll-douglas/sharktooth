import { useState } from "react";
import type { DownloadUpdate } from "../types";
import useDeleteDownloads from "./useDeleteDownloads";
import useDownloadsSelection, {
  type UseDownloadsSelectionReturn,
} from "./useDownloadsSelection";

export interface UseQueuedDownloadsReturn {
  /**
   * The list of queued downloads sorted by which were queued earliest.
   */
  queuedWithEarliestFirst: DownloadUpdate[];

  /**
   * Handles the deletion of queued downloads that are selected.
   */
  handleDelete: () => Promise<void>;

  /**
   * A value returned from a useDownloadsSelection hook call.
   */
  downloadsSelection: UseDownloadsSelectionReturn;

  /**
   * Whether a request is currently in progress to delete queued downloads.
   */
  isDeleting: boolean;
}

/**
 * Hook to work with queued downloads.
 *
 * @param queuedDownloads The full list of queued downloads.
 * @returns An object containing handlers and utilities.
 */
export default function useQueuedDownloads(
  queuedDownloads: DownloadUpdate[]
): UseQueuedDownloadsReturn {
  const downloadsSelection = useDownloadsSelection(queuedDownloads);
  const [isDeleting, setIsDeleting] = useState(false);

  const queuedWithEarliestFirst = queuedDownloads.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const _handleDelete = useDeleteDownloads(downloadsSelection);

  const handleDelete = async () => {
    setIsDeleting(true);

    await _handleDelete();

    setIsDeleting(false);
  };

  return {
    queuedWithEarliestFirst,
    handleDelete,
    downloadsSelection,
    isDeleting,
  };
}
