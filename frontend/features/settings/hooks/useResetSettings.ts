import { toaster } from "@/components/chakra-ui/toaster";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Hook that provides the reset settings handler.
 *
 * @returns The handler.
 */
export default function useResetSettings() {
  const queryClient = useQueryClient();

  const handleResetSettings = async () => {
    await window.electronAPI.resetSettings();

    toaster.create({
      title: "Successfully reset settings.",
      type: "success",
    });

    queryClient.invalidateQueries({ queryKey: ["get-setting"] });
  };

  return handleResetSettings;
}
