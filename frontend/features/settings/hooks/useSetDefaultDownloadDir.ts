import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Hook that provides a handler and "is dialog open" flag to set the `default_download_dir` key in the application settings.
 *
 * @returns The handler and flag.
 */
export default function useSetDefaultDownloadDir() {
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
