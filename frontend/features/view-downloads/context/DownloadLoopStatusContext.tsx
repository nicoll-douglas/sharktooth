import { createContext, type ReactNode } from "react";
import useSafeContext from "@/hooks/useSafeContext";
import useDownloadLoopStatus, {
  type UseDownloadLoopStatusReturn,
} from "../hooks/useDownloadLoopStatus";

/**
 * The download loop status provider.
 */
export const DownloadLoopStatusContext =
  createContext<UseDownloadLoopStatusReturn | null>(null);

/**
 * Provider for the download loop status context.
 *
 * Provides a shareable set of values returned from a useDownloadLoopStatus call.
 */
export function DownloadLoopStatusProvider({
  children,
}: {
  children: ReactNode;
}) {
  const contextValue = useDownloadLoopStatus();

  return (
    <DownloadLoopStatusContext value={contextValue}>
      {children}
    </DownloadLoopStatusContext>
  );
}

/**
 * Hook to use the download loop status context.
 *
 * @returns The context value.
 */
export function useDownloadLoopStatusContext(): UseDownloadLoopStatusReturn {
  return useSafeContext<UseDownloadLoopStatusReturn>(DownloadLoopStatusContext);
}
