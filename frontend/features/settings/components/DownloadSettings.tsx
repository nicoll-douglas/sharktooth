import * as Ch from "@chakra-ui/react";
import { LuFolder } from "react-icons/lu";
import SettingsGroup from "./shared/SettingsGroup";
import useGetSetting from "../hooks/useGetSetting";
import useSetDefaultDownloadDir from "../hooks/useSetDefaultDownloadDir";
import { Tooltip } from "@/components/chakra-ui/tooltip";

/**
 * A card component that contains related settings to do with downloads for the user to configure.
 */
export default function DownloadSettings() {
  const { isDialogOpen, handleSetDefaultDownloadDir } =
    useSetDefaultDownloadDir();
  const { data: defaultDownloadDir } = useGetSetting("default_download_dir");

  return (
    <SettingsGroup heading="Downloads">
      <Ch.Field.Root maxW={"lg"}>
        <Ch.Field.Label>Default Save Directory</Ch.Field.Label>
        <Ch.Group attached w="full">
          <Tooltip content={defaultDownloadDir} disabled={!defaultDownloadDir}>
            <Ch.Input
              value={defaultDownloadDir}
              disabled
              cursor={"default"}
              textOverflow={"ellipsis"}
              borderRight={"none"}
              borderRightRadius={0}
            />
          </Tooltip>
          <Ch.Button
            variant={"outline"}
            onClick={handleSetDefaultDownloadDir}
            disabled={isDialogOpen}
          >
            <LuFolder /> Change
          </Ch.Button>
        </Ch.Group>
        <Ch.Field.HelperText>
          The default directory on disk where downloaded tracks are saved.
        </Ch.Field.HelperText>
      </Ch.Field.Root>
    </SettingsGroup>
  );
}
