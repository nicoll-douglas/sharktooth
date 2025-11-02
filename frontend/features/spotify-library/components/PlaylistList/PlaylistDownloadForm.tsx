import * as Ch from "@chakra-ui/react";
import { usePlaylistDownloadFormContext } from "../../context/PlaylistDownloadFormContext";
import CodecAndBitrateFields from "@/components/CodecAndBitrateFields";
import { audioConfig } from "@/config/audio";
import { Controller } from "react-hook-form";

/**
 * Represents a card component that lays out the step for the user to select options for their playlist download such as codec and bitrate and then start the download.
 */
export default function PlaylistDownloadForm() {
  const { form } = usePlaylistDownloadFormContext();

  return (
    <Ch.Stack gap={"5"} maxW={"lg"}>
      <Ch.Field.Root>
        <Controller
          control={form.control}
          name="prefillMetadata"
          render={({ field }) => (
            <Ch.Checkbox.Root
              checked={field.value}
              onCheckedChange={({ checked }) => field.onChange(checked)}
              size={"sm"}
            >
              <Ch.Checkbox.Label asChild>
                <Ch.Field.Label>Prefill Metadata:</Ch.Field.Label>
              </Ch.Checkbox.Label>
              <Ch.Checkbox.HiddenInput />
              <Ch.Checkbox.Control />
            </Ch.Checkbox.Root>
          )}
        />

        <Ch.Field.ErrorText>
          {form.formState.errors.prefillMetadata?.message}
        </Ch.Field.ErrorText>

        <Ch.Field.HelperText>
          Whether to prefill audio file metadata available from the Spotify API.
        </Ch.Field.HelperText>
      </Ch.Field.Root>

      <CodecAndBitrateFields form={form} />

      <Ch.Field.Root invalid={!!form.formState.errors.playlistFormat} required>
        <Ch.Field.Label>
          Desired Playlist Format
          <Ch.Field.RequiredIndicator />
        </Ch.Field.Label>

        <Ch.NativeSelect.Root>
          <Ch.NativeSelect.Field {...form.register("playlistFormat")}>
            {audioConfig.playlistFormats.map((playlistFormat, index) => (
              <option key={index} value={playlistFormat}>
                {playlistFormat}
              </option>
            ))}
          </Ch.NativeSelect.Field>
          <Ch.NativeSelect.Indicator />
        </Ch.NativeSelect.Root>

        <Ch.Field.ErrorText>
          {form.formState.errors.playlistFormat?.message}
        </Ch.Field.ErrorText>

        <Ch.Field.HelperText>
          The desired playlist file output type.
        </Ch.Field.HelperText>
      </Ch.Field.Root>
    </Ch.Stack>
  );
}
