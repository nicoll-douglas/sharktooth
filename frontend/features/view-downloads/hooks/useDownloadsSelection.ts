import type { DownloadUpdate } from "../types";
import useSelection, { type UseSelectionReturn } from "@/hooks/useSelection";

export type UseDownloadsSelectionReturn = UseSelectionReturn;

/**
 * Wrapper hook around useSelection to work with a selection of downloads.
 *
 * @param downloads The list of downloads.
 * @returns Event handlers and state values for selection state.
 */
export default function useDownloadsSelection(
  downloads: DownloadUpdate[]
): UseDownloadsSelectionReturn {
  return useSelection(downloads.map((download) => download.download_id));
}
