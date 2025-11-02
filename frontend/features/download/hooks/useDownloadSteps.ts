import { useState, useEffect } from "react";
import { useDownloadFormContext } from "../context/DownloadFormContext";
import type { StepsChangeDetails } from "@chakra-ui/react";

export interface UseDownloadStepsReturn {
  /**
   * Indicates whether the previous step trigger button is disabled.
   */
  prevDisabled: boolean;

  /**
   * Indicates whether the next step trigger button is disabled.
   */
  nextDisabled: boolean;

  /**
   * The current step.
   */
  step: number;

  /**
   * Handler to run whenever the step value changes.
   *
   * @param e Contains the new step value..
   */
  onStepChange: (e: StepsChangeDetails) => void;
}

/**
 * Hook that provides control values for working with the DownloadSteps component.
 *
 * @returns An object containing the control values.
 */
export default function useDownloadSteps() {
  const [step, setStep] = useState(0);
  const { form } = useDownloadFormContext();

  const url = form.watch("url");
  const downloadDir = form.watch("downloadDir");

  const prevDisabled = step === 3 || step === 0;
  const nextDisabled =
    (step === 0 && !url) || (step === 1 && !downloadDir) || step >= 2;

  const onStepChange = (e: StepsChangeDetails) => setStep(e.step);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      setStep(3);
    }
  }, [form.formState.isSubmitSuccessful]);

  return { prevDisabled, nextDisabled, step, onStepChange };
}
