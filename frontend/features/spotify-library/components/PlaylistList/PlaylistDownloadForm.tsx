import * as Ch from "@chakra-ui/react";
import { usePlaylistDownloadFormContext } from "../../context/PlaylistDownloadFormContext";
import CodecAndBitrateFields from "@/components/CodecAndBitrateFields";

/**
 * Represents a card component that lays out the step for the user to select options for their playlist download such as codec and bitrate.
 */
export default function PlaylistDownloadForm() {
  const { form } = usePlaylistDownloadFormContext();

  return (
    <Ch.Stack gap={"5"} maxW={"lg"}>
      <Ch.Field.Root>
        <Ch.Checkbox.Root size={"sm"}>
          <Ch.Checkbox.Label asChild>
            <Ch.Field.Label>Prefill Metadata:</Ch.Field.Label>
          </Ch.Checkbox.Label>
          <Ch.Checkbox.HiddenInput />
          <Ch.Checkbox.Control />
        </Ch.Checkbox.Root>

        <Ch.Field.HelperText>
          Whether to prefill audio file metadata available from the Spotify API.
        </Ch.Field.HelperText>
      </Ch.Field.Root>
      <CodecAndBitrateFields form={form} />
    </Ch.Stack>
  );
}
