import * as Ch from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import EnterUrlStep from "./EnterUrlStep";
import DownloadOptionsStep from "./DownloadOptionsStep";
import { DownloadFormProvider } from "../../context/DownloadFormContext";
import CompletedContent from "./CompletedContent";
import MetadataStep from "./MetadataStep";
import useDownloadSteps from "../../hooks/useDownloadSteps";

/**
 * Component that contains a step-based flow for configuring a track download and then starting the download.
 */
export default function DownloadSteps() {
  const _DownloadSteps = () => {
    const { prevDisabled, nextDisabled, step, onStepChange } =
      useDownloadSteps();

    return (
      <Ch.Steps.Root step={step} onStepChange={onStepChange} count={3}>
        <Ch.Steps.List flexWrap={"wrap"} gap={"3"}>
          <Ch.Steps.Item index={0} title={"Enter Source URL"}>
            <Ch.Steps.Indicator />
            <Ch.Steps.Title textWrap={"nowrap"}>
              Enter Source URL
            </Ch.Steps.Title>
            <Ch.Steps.Separator mr={"0"} />
          </Ch.Steps.Item>

          <Ch.Steps.Item index={1} title={"Set Download Options"}>
            <Ch.Steps.Indicator />
            <Ch.Steps.Title textWrap={"nowrap"}>
              Set Download Options
            </Ch.Steps.Title>
            <Ch.Steps.Separator mr={"0"} />
          </Ch.Steps.Item>

          <Ch.Steps.Item index={2} title={"Set Track Metadata"}>
            <Ch.Steps.Indicator />
            <Ch.Steps.Title textWrap={"nowrap"}>
              Set Track Metadata
            </Ch.Steps.Title>
            <Ch.Steps.Separator mr={"0"} />
          </Ch.Steps.Item>
        </Ch.Steps.List>

        <Ch.Steps.Content index={0}>
          <EnterUrlStep />
        </Ch.Steps.Content>

        <Ch.Steps.Content index={1}>
          <DownloadOptionsStep />
        </Ch.Steps.Content>

        <Ch.Steps.Content index={2}>
          <MetadataStep />
        </Ch.Steps.Content>

        <Ch.Steps.CompletedContent>
          <CompletedContent />
        </Ch.Steps.CompletedContent>

        <Ch.ButtonGroup size="sm" variant="outline">
          <Ch.Steps.PrevTrigger asChild>
            <Ch.Button disabled={prevDisabled}>
              <LuChevronLeft />
              Prev
            </Ch.Button>
          </Ch.Steps.PrevTrigger>

          <Ch.Steps.NextTrigger asChild>
            <Ch.Button disabled={nextDisabled}>
              Next
              <LuChevronRight />
            </Ch.Button>
          </Ch.Steps.NextTrigger>
        </Ch.ButtonGroup>
      </Ch.Steps.Root>
    );
  };

  return (
    <DownloadFormProvider>
      <_DownloadSteps />
    </DownloadFormProvider>
  );
}
