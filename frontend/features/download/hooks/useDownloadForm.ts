import {
  useForm,
  useFieldArray,
  type UseFormReturn,
  type FieldArrayWithId,
} from "react-hook-form";
import { useEffect, useState, type BaseSyntheticEvent } from "react";
import type { DownloadFormValues } from "../forms/downloadForm";
import startDownload from "../services/startDownload";
import type { PostDownloadsResponse } from "../types";
import { useGetSetting } from "@/features/settings";

export interface UseDownloadFormReturn {
  /**
   * The response to the form submission request if submitted.
   */
  response: PostDownloadsResponse | null;

  /**
   * The form submission handler.
   *
   * @param e The event.
   */
  onFormSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;

  /**
   * The form.
   */
  form: UseFormReturn<DownloadFormValues, any, DownloadFormValues>;

  /**
   * Utilities for form rendering.
   */
  utils: {
    /**
     * The artist name field array.
     */
    artistNameFields: FieldArrayWithId<
      DownloadFormValues,
      "artistNames",
      "id"
    >[];

    /**
     * A helper function to add an artist name to the field array.
     */
    addArtistName: () => void;

    /**
     * A helper function to remove an artist name from the field array.
     *
     * @param index The index of the artist in the array.
     */
    removeArtistName: (index: number) => void;
  };
}

/**
 * Hook to provide a form that uses the start downloads service on submission as well as related functions and values.
 *
 * @returns The form and related functions and values.
 */
export default function useDownloadForm(): UseDownloadFormReturn {
  const [response, setResponse] = useState<PostDownloadsResponse | null>(null);
  const { data: defaultDownloadDir } = useGetSetting("default_download_dir");

  const form = useForm<DownloadFormValues>({
    defaultValues: {
      codec: "mp3",
      artistNames: [{ value: "" }],
      bitrate: "320",
      trackNumber: "",
      discNumber: "",
      trackName: "",
      albumName: "",
      releaseYear: "",
      releaseMonth: "",
      releaseDay: "",
      downloadDir: defaultDownloadDir ?? "",
      url: "",
      albumCoverPath: "",
    },
  });

  useEffect(() => {
    if (defaultDownloadDir) {
      form.setValue("downloadDir", defaultDownloadDir);
    }
  }, [defaultDownloadDir]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "artistNames",
  });

  const addArtistName = () => append({ value: "" });
  const removeArtistName = (index: number) => remove(index);

  const onFormSubmit = form.handleSubmit(async (data) => {
    const res = await startDownload(data);
    setResponse(res);
  });

  return {
    response,
    onFormSubmit,
    form,
    utils: {
      artistNameFields: fields,
      addArtistName,
      removeArtistName,
    },
  };
}
