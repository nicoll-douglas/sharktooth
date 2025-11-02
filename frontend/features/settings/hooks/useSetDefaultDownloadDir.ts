import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export interface UseSetDefaultDownloadDirReturn {
  /**
   * Whether the directory picker dialog is currently open.
   */
  isDialogOpen: boolean;

  /**
   * Handler that opens a directory picker dialog for the user to set the new setting value.
   */
  handleSetDefaultDownloadDir: () => Promise<void>;
}

/**
 * Hook that provides a handler to set the default_download_dir key in the application settings.
 *
 * @returns Contains a handler that opens a directory picker dialog and a flag indicating whether the dialog is open.
 */
export default function useSetDefaultDownloadDir(): UseSetDefaultDownloadDirReturn {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleSetDefaultDownloadDir = async () => {
    setIsDialogOpen(true);

    const newDefaultDownloadDir = await window.electronAPI.pickDirectory(
      "Select a New Default Download Directory"
    );

    setIsDialogOpen(false);

    if (!newDefaultDownloadDir) return;

    await window.electronAPI.setSetting(
      "default_download_dir",
      newDefaultDownloadDir
    );

    queryClient.invalidateQueries({
      queryKey: ["get-setting", "default_download_dir"],
    });
  };

  return { isDialogOpen, handleSetDefaultDownloadDir };
}
