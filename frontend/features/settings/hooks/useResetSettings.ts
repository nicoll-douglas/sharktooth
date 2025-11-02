import { toaster } from "@/components/chakra-ui/toaster";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Hook that provides a handler to reset the application's settings.
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
