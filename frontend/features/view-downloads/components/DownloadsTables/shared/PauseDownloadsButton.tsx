import { Tooltip } from "@/components/chakra-ui/tooltip";
import { LuPause, LuPlay } from "react-icons/lu";
import * as Ch from "@chakra-ui/react";
import { useDownloadLoopStatusContext } from "@/features/view-downloads/context/DownloadLoopStatusContext";

export interface PauseDownloadsButtonProps {
  /**
   * Whether the button is disabled or not in addition to updates being disabled.
   */
  disabled?: boolean;
}

/**
 * A button component that pauses or resumes the application download loop.
 */
export default function PauseDownloadsButton({
  disabled,
}: PauseDownloadsButtonProps) {
  const {
    isDownloadLoopPaused,
    handlePauseDownloadLoop,
    handleResumeDownloadLoop,
    updateDisabled,
  } = useDownloadLoopStatusContext();

  return (
    <Tooltip
      content="Pressing pause only pauses the queue, not the current download."
      disabled={isDownloadLoopPaused}
    >
      <Ch.Button
        variant={"surface"}
        maxWidth={"fit-content"}
        disabled={updateDisabled || disabled}
        size={"sm"}
        onClick={async () => {
          if (isDownloadLoopPaused === undefined) return;

          if (isDownloadLoopPaused) {
            await handleResumeDownloadLoop();
          } else {
            await handlePauseDownloadLoop();
          }
        }}
      >
        {isDownloadLoopPaused ? (
          <>
            Resume
            <LuPlay />
          </>
        ) : (
          <>
            Pause
            <LuPause />
          </>
        )}
      </Ch.Button>
    </Tooltip>
  );
}
