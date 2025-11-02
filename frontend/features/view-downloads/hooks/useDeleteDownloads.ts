import deleteDownloads from "../services/deleteDownloads";
import type { UseDownloadsSelectionReturn } from "./useDownloadsSelection";
import { toaster } from "@/components/chakra-ui/toaster";
import getPlural from "@/utils/getPlural";

/**
 * Hook that provides a handler to delete a selection of downloads.
 *
 * @param downloadsSelection A value return from a useDownloadsSelection hook call.
 * @returns The handler that deletes a selection of downloads.
 */
export default function useDeleteDownloads(
  downloadsSelection: UseDownloadsSelectionReturn
) {
  const handleDelete = async () => {
    const res = await deleteDownloads(downloadsSelection.selection);

    if (res.status === 200) {
      toaster.create({
        title: `Successfully removed ${downloadsSelection.selectionCount} ${getPlural("download", downloadsSelection.selectionCount)}.`,
        type: "success",
      });

      downloadsSelection.resetSelection();
    }
  };

  return handleDelete;
}
