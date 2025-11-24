import * as Ch from "@chakra-ui/react";
import type { ReactNode } from "react";

/**
 * Props for the SetAlbumCoverCard component.
 */
export interface SetAlbumCoverCardProps {
  children: ReactNode;
}

/**
 * Represents a card component that lets a user fetch or select an album cover from disk to set in a track's metadata.
 */
export default function SetAlbumCoverCard({
  children,
}: SetAlbumCoverCardProps) {
  return (
    <Ch.Card.Root size={"sm"}>
      <Ch.Card.Header>
        <Ch.Card.Title>Set Album Cover</Ch.Card.Title>
        <Ch.Card.Description>
          Select an album cover from disk or search for one.
        </Ch.Card.Description>
      </Ch.Card.Header>
      <Ch.Card.Body>{children}</Ch.Card.Body>
    </Ch.Card.Root>
  );
}
