import { useDownloadFormContext } from "../../../context/DownloadFormContext";
import * as Ch from "@chakra-ui/react";
import DownloadDirectoryPicker from "./DownloadDirectoryPicker";
import CodecAndBitrateFields from "@/components/CodecAndBitrateFields";

/**
 * Represents a card component that lays out the step for the user to select options for their download such as codec and bitrate.
 */
export default function DownloadOptionsStep() {
  const { form, utils } = useDownloadFormContext();

  return (
    <Ch.Card.Root size={"sm"}>
      <Ch.Card.Header>
        <Ch.Card.Title>Download Options</Ch.Card.Title>
      </Ch.Card.Header>
      <Ch.Card.Body>
        <Ch.Stack gap={"5"} maxW={"lg"}>
          <DownloadDirectoryPicker />

          <Ch.Field.Root required invalid={!!form.formState.errors.filename}>
            <Ch.Field.Label>
              Filename <Ch.Field.RequiredIndicator />
            </Ch.Field.Label>
            <Ch.Input
              placeholder="One_More_Time"
              {...form.register("filename")}
            />
            <Ch.Field.ErrorText>
              {form.formState.errors.filename?.message}
            </Ch.Field.ErrorText>
          </Ch.Field.Root>

          <CodecAndBitrateFields form={form} />
        </Ch.Stack>
      </Ch.Card.Body>
    </Ch.Card.Root>
  );
}
