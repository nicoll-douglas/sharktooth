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
          <CodecAndBitrateFields form={form} />
        </Ch.Stack>
      </Ch.Card.Body>
    </Ch.Card.Root>
  );
}
