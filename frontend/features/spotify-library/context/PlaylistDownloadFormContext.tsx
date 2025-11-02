import { createContext, type ReactNode } from "react";
import usePlaylistDownloadForm, {
  type UsePlaylistDownloadFormReturn,
} from "../hooks/usePlaylistDownloadForm";
import useSafeContext from "@/hooks/useSafeContext";

/**
 * The playlist download form context.
 */
export const PlaylistDownloadFormContext =
  createContext<UsePlaylistDownloadFormReturn | null>(null);

/**
 * Provider for the playlist download form context.
 *
 * Provides a shareable set of values returned from a usePlaylistDownloadForm call.
 */
export function PlaylistDownloadFormProvider({
  children,
}: {
  children: ReactNode;
}) {
  const contextValue = usePlaylistDownloadForm();

  return (
    <PlaylistDownloadFormContext value={contextValue}>
      {children}
    </PlaylistDownloadFormContext>
  );
}

/**
 * Hook to use the playlist download form context.
 *
 * @returns The context value.
 */
export function usePlaylistDownloadFormContext(): UsePlaylistDownloadFormReturn {
  return useSafeContext<UsePlaylistDownloadFormReturn>(
    PlaylistDownloadFormContext
  );
}
