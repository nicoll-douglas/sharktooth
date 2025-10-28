import { useQuery } from "@tanstack/react-query";
import type { SettingsKey } from "types/shared";

/**
 * Hook that provides a query to get a settings value.
 *
 * @param key The key in the settings to get.
 * @returns The query.
 */
export default function useGetSetting(key: SettingsKey) {
  return useQuery({
    queryKey: ["get-setting", key],
    queryFn: async () => window.electronAPI.getSetting(key),
  });
}
