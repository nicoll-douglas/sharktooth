import * as Ch from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useSearchDownloadsFormContext } from "../../../context/SearchDownloadsFormContext";
import { useDownloadFormContext } from "../../../context/DownloadFormContext";

/**
 * Represents a card component that contains a form to search for download sources.
 */
export default function SearchDownloadsForm() {
  const { form, onFormSubmit } = useSearchDownloadsFormContext();
  const { form: downloadForm } = useDownloadFormContext();
  const { onChange: onArtistChange, ...mainArtistFieldRegistration } =
    form.register("main_artist");
  const { onChange: onTrackChange, ...trackNameFieldRegistration } =
    form.register("track_name");

  return (
    <Ch.Card.Root size={"sm"}>
      <Ch.Card.Header>
        <Ch.Card.Title>Search Tracks</Ch.Card.Title>
        <Ch.Card.Description>
          If you wish to search for a track, input the details below.
        </Ch.Card.Description>
      </Ch.Card.Header>
      <Ch.Card.Body>
        <Ch.Stack as={"form"} onSubmit={onFormSubmit} gap={"5"} maxW={"lg"}>
          <Ch.Field.Root invalid={!!form.formState.errors.main_artist} required>
            <Ch.Field.Label>
              Main Artist
              <Ch.Field.RequiredIndicator />
            </Ch.Field.Label>
            <Ch.Input
              onChange={(e) => {
                onArtistChange(e);
                downloadForm.setValue("artistNames", [
                  { value: e.target.value },
                ]);
              }}
              placeholder="Daft Punk"
              {...mainArtistFieldRegistration}
            />
            <Ch.Field.ErrorText>
              {form.formState.errors.main_artist?.message}
            </Ch.Field.ErrorText>
          </Ch.Field.Root>

          <Ch.Field.Root invalid={!!form.formState.errors.track_name} required>
            <Ch.Field.Label>
              Track Name
              <Ch.Field.RequiredIndicator />
            </Ch.Field.Label>
            <Ch.Input
              onChange={(e) => {
                onTrackChange(e);
                downloadForm.setValue("trackName", e.target.value);
              }}
              placeholder="One More Time"
              {...trackNameFieldRegistration}
            />
            <Ch.Field.ErrorText>
              {form.formState.errors.track_name?.message}
            </Ch.Field.ErrorText>
          </Ch.Field.Root>

          <Ch.Button
            type="submit"
            variant={"subtle"}
            maxW={"fit"}
            loading={form.formState.isSubmitting}
          >
            Search
            <LuSearch />
          </Ch.Button>
        </Ch.Stack>
      </Ch.Card.Body>
    </Ch.Card.Root>
  );
}
