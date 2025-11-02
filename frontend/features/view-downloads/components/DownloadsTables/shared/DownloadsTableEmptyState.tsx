import * as Ch from "@chakra-ui/react";
import { LuListX } from "react-icons/lu";
import type { ReactNode } from "react";

export interface DownloadTableEmptyState {
  /**
   * The title to describe the empty state.
   */
  title: ReactNode;

  /**
   * The description to give more details about the empty state.
   */
  description: ReactNode;
}

/**
 * Shows an empty state for when there are no downloads in a downloads table.
 */
export default function DownloadsTableEmptyState({
  title,
  description,
}: DownloadTableEmptyState) {
  return (
    <Ch.EmptyState.Root size={"sm"}>
      <Ch.EmptyState.Content>
        <Ch.EmptyState.Indicator>
          <LuListX />
        </Ch.EmptyState.Indicator>
        <Ch.VStack textAlign="center">
          <Ch.EmptyState.Title>{title}</Ch.EmptyState.Title>
          <Ch.EmptyState.Description>{description}</Ch.EmptyState.Description>
        </Ch.VStack>
      </Ch.EmptyState.Content>
    </Ch.EmptyState.Root>
  );
}
