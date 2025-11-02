import { useForm, type UseFormReturn } from "react-hook-form";
import { type PlaylistDownloadFormValues } from "../forms/playlistDownloadForm";

export interface UsePlaylistDownloadFormReturn {
  form: UseFormReturn<
    PlaylistDownloadFormValues,
    any,
    PlaylistDownloadFormValues
  >;
}

export default function usePlaylistDownloadForm() {
  const form = useForm<PlaylistDownloadFormValues>({
    defaultValues: {
      codec: "mp3",
      bitrate: "320",
      playlistFormat: "m3u8",
      prefillMetadata: true,
    },
  });

  return { form };
}
