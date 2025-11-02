import * as Ch from "@chakra-ui/react";
import { LuCircleMinus } from "react-icons/lu";

export interface DeleteDownloadsButtonProps {
  /**
   * Handler that deletes selected downloads.
   */
  handleDelete: () => Promise<void>;
}

/**
 * A button that deletes a selection of downloads when clicked.
 */
export default function DeleteDownloadsButton({
  handleDelete,
}: DeleteDownloadsButtonProps) {
  return (
    <Ch.Button colorPalette={"red"} variant={"surface"} onClick={handleDelete}>
      Remove
      <LuCircleMinus />
    </Ch.Button>
  );
}
