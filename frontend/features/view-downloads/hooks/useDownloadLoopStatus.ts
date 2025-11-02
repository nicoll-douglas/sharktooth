import { useQuery, useQueryClient } from "@tanstack/react-query";
import pauseDownloadLoop from "../services/pauseDownloadLoop";
import resumeDownloadLoop from "../services/resumeDownloadLoop";
import checkIsDownloadLoopPaused from "../services/isDownloadLoopPaused";
import { useState } from "react";

export interface UseDownloadLoopStatusReturn {
  /**
   * Resumes the download loop.
   */
  handleResumeDownloadLoop: () => Promise<void>;

  /**
   * Pauses the download loop.
   */
  handlePauseDownloadLoop: () => Promise<void>;

  /**
   * A boolean flag indicating whether the application download loop is paused, undefined if the data is loading.
   */
  isDownloadLoopPaused: boolean | undefined;

  /**
   * Indicates whether updates for the download loop status should be disabled.
   */
  updateDisabled: boolean;
}

/**
 * Hook that provides utilities for working with the application's download loop status.
 *
 * @returns An object containing utilities for working with the application's download loop status.
 */
export default function useDownloadLoopStatus(): UseDownloadLoopStatusReturn {
  const queryClient = useQueryClient();
  const [updating, setUpdating] = useState(false);

  const handleResumeDownloadLoop = async () => {
    setUpdating(true);

    await resumeDownloadLoop();
    queryClient.invalidateQueries({ queryKey: ["downloads-is-paused"] });

    setUpdating(false);
  };

  const handlePauseDownloadLoop = async () => {
    setUpdating(true);

    await pauseDownloadLoop();
    queryClient.invalidateQueries({ queryKey: ["downloads-is-paused"] });

    setUpdating(false);
  };

  const { data: isDownloadLoopPaused, isLoading } = useQuery({
    queryKey: ["downloads-is-paused"],
    queryFn: async () => checkIsDownloadLoopPaused(),
  });

  return {
    isDownloadLoopPaused,
    updateDisabled: updating || isLoading,
    handleResumeDownloadLoop,
    handlePauseDownloadLoop,
  };
}
