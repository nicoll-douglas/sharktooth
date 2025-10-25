import * as Ch from "@chakra-ui/react";
import SettingsGroup from "./shared/SettingsGroup";
import useRestoreSettings from "../hooks/useRestoreSettings";
import { LuRefreshCw } from "react-icons/lu";
import { toaster } from "@/components/chakra-ui/toaster";

/**
 * Represents a card component that holds general application settings.
 */
export default function GeneralSettings() {
  const restoreSettingsMutation = useRestoreSettings();

  // if error in update mutation, then toast error "failed to update settings"

  return (
    <SettingsGroup heading="General">
      <Ch.Field.Root>
        <Ch.Field.Label>Restore Defaults</Ch.Field.Label>
        <Ch.Field.HelperText>Restore the default settings.</Ch.Field.HelperText>
        <Ch.Button
          size={"sm"}
          colorPalette={"red"}
          marginTop={"2"}
          onClick={async () => {
            const success = await restoreSettingsMutation.mutateAsync();

            if (success) {
              toaster.create({
                title: "Successfully restored settings.",
                type: "success",
              });
            } else {
              toaster.create({
                title: "Something went wrong, failed to restore settings.",
                type: "error",
              });
            }
          }}
        >
          Restore
          <LuRefreshCw />
        </Ch.Button>
      </Ch.Field.Root>
    </SettingsGroup>
  );
}
