import * as Ch from "@chakra-ui/react";
import { Link } from "react-router";
import { type IconType } from "react-icons";

export interface SidebarButtonLinkProps {
  /**
   * The href of the link.
   */
  href: string;

  /**
   * The text of the link.
   */
  children: React.ReactNode;

  /**
   * The icon of the link.
   */
  Icon: IconType;
}

/**
 * A navigation link that appears as a button in the sidebar.
 */
export default function SidebarButtonLink({
  href,
  children,
  Icon,
}: SidebarButtonLinkProps) {
  return (
    <>
      <Ch.Button
        justifyContent={"start"}
        variant={"ghost"}
        width={"full"}
        asChild
        display={{ lgDown: "none" }}
      >
        <Ch.Link textDecoration={"none"} asChild>
          <Link to={href}>
            <Ch.Flex gap={"2"}>
              <Ch.Icon size={"inherit"} color={"blue.fg"}>
                <Icon />
              </Ch.Icon>
              {children}
            </Ch.Flex>
          </Link>
        </Ch.Link>
      </Ch.Button>
      <Ch.IconButton asChild display={{ lg: "none" }} variant={"ghost"}>
        <Ch.Link asChild>
          <Link to={href}>
            <Ch.Icon size={"inherit"} color={"blue.fg"}>
              <Icon />
            </Ch.Icon>
          </Link>
        </Ch.Link>
      </Ch.IconButton>
    </>
  );
}
