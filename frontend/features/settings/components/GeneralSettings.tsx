import * as Ch from "@chakra-ui/react";
import SettingsGroup from "./shared/SettingsGroup";
import { LuRefreshCw } from "react-icons/lu";
import useResetSettings from "../hooks/useResetSettings";

/**
 * A card component that contains general application settings for the user to configure.
 */
export default function GeneralSettings() {
  const handleResetSettings = useResetSettings();

  return (
    <SettingsGroup heading="General">
      <Ch.Field.Root>
        <Ch.Field.Label>Restore Defaults</Ch.Field.Label>
        <Ch.Field.HelperText>Restore the default settings.</Ch.Field.HelperText>
        <Ch.Button
          size={"sm"}
          colorPalette={"red"}
          marginTop={"2"}
          onClick={handleResetSettings}
        >
          Restore
          <LuRefreshCw />
        </Ch.Button>
      </Ch.Field.Root>
    </SettingsGroup>
  );
}
