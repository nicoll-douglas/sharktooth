import * as Ch from "@chakra-ui/react";

export interface PageHeadingProps {
  /**
   * The text of the heading.
   */
  children: React.ReactNode;
}

/**
 * A heading component to use as the main heading for pages in the application.
 */
export default function PageHeading({ children }: PageHeadingProps) {
  return (
    <Ch.Heading as={"h1"} size={"2xl"} lineHeight={"1"}>
      {children}
    </Ch.Heading>
  );
}
