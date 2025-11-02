import type { DownloadUpdate } from "../types";
import useDownloadsSelection, {
  type UseDownloadsSelectionReturn,
} from "./useDownloadsSelection";
import useDeleteDownloads from "./useDeleteDownloads";

export interface UseCompletedDownloadsReturn {
  /**
   * A value returned from a useDownloadsSelection hook call.
   */
  downloadsSelection: UseDownloadsSelectionReturn;

  /**
   * Handles the deletion of completed downloads that are selected.
   */
  handleDelete: () => Promise<void>;
}

/**
 * Hook to work with completed downloads.
 *
 * @param completedDownloads The full list of completed downloads.
 * @returns An object containing handlers and utilities.
 */
export default function useCompletedDownloads(
  completedDownloads: DownloadUpdate[]
) {
  const downloadsSelection = useDownloadsSelection(completedDownloads);

  const handleDelete = useDeleteDownloads(downloadsSelection);

  return { downloadsSelection, handleDelete };
}
