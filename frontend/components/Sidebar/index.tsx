import * as Ch from "@chakra-ui/react";
import { LuList, LuDownload, LuInfo } from "react-icons/lu";
import { FaSpotify } from "react-icons/fa";
import SidebarButtonLink from "./SidebarButtonLink";
import Logo from "../Logo";
import { ColorModeButton } from "../chakra-ui/color-mode";
import { system } from "@/config/theme";
import SettingsButton from "./SettingsButton";

/**
 * The sidebar in the UI that contains links to navigate through the app as well as a dark mode toggle and a logo.
 */
export default function Sidebar() {
  return (
    <Ch.Stack
      gap={"4"}
      minWidth={{ lg: "2xs" }}
      position={"sticky"}
      top={"4"}
      height={`calc(100dvh - ${system.token("spacing.8")})`}
    >
      <Ch.Card.Root size={"sm"}>
        <Ch.Card.Body p={"2"}>
          <Ch.IconButton
            variant={"plain"}
            as={"div"}
            cursor={"default"}
            display={{ lg: "none" }}
          >
            <Logo />
          </Ch.IconButton>

          <Ch.HStack width={"full"} display={{ base: "none", lg: "flex" }}>
            <Ch.Button
              variant={"plain"}
              as={"div"}
              cursor={"default"}
              fontSize={"md"}
              textTransform={"uppercase"}
            >
              {import.meta.env.VITE_APP_NAME}
              <Logo />
            </Ch.Button>

            <Ch.Separator orientation={"vertical"} height={"4"} />

            <ColorModeButton />

            <SettingsButton display={{ lgDown: "none" }} />
          </Ch.HStack>
        </Ch.Card.Body>
      </Ch.Card.Root>

      <Ch.Card.Root size={"sm"} flex={"1"} maxHeight={"100%"}>
        <Ch.Card.Body p={{ lgDown: "2" }}>
          <Ch.Stack width={"full"} height={"100%"}>
            <SidebarButtonLink Icon={LuDownload} href="/">
              New Download
            </SidebarButtonLink>

            <SidebarButtonLink href="/downloads" Icon={LuList}>
              Downloads
            </SidebarButtonLink>

            {import.meta.env.VITE_FEATURE_SPOTIFY_LIBRARY === "true" && (
              <SidebarButtonLink Icon={FaSpotify} href="/spotify-library">
                My Spotify Library
              </SidebarButtonLink>
            )}

            <Ch.Spacer />

            <ColorModeButton display={{ lg: "none" }} />

            <SettingsButton display={{ lg: "none" }} />

            {import.meta.env.VITE_FEATURE_ABOUT === "true" && (
              <>
                <Ch.Separator display={{ lgDown: "none" }} />
                <SidebarButtonLink Icon={LuInfo} href="/about">
                  About
                </SidebarButtonLink>
              </>
            )}
          </Ch.Stack>
        </Ch.Card.Body>
      </Ch.Card.Root>
    </Ch.Stack>
  );
}
