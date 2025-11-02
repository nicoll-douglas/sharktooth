import * as Ch from "@chakra-ui/react";
import type { ReactNode } from "react";

export interface SettingsGroupProps {
  /**
   * The name of the settings group to use as the component heading.
   */
  heading: string;

  /**
   * The settings management components.
   */
  children: ReactNode;
}

/**
 * A card container for a group of related application settings.
 */
export default function SettingsGroup({
  children,
  heading,
}: SettingsGroupProps) {
  return (
    <Ch.Card.Root size={"sm"}>
      <Ch.Card.Header>
        <Ch.Card.Title>{heading}</Ch.Card.Title>
      </Ch.Card.Header>
      <Ch.Card.Body>
        <Ch.Stack maxW={"lg"} gap="5">
          {children}
        </Ch.Stack>
      </Ch.Card.Body>
    </Ch.Card.Root>
  );
}
