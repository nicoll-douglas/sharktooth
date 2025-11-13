import type { DownloadFormValues } from "../forms/downloadForm";
import type { NewDownload } from "shared/types/download";

/**
 * Extracts the form data values in a download form to a download object.
 *
 * @param formData The form data values.
 * @returns The download object.
 */
export default function extractDownloadFormData(
  formData: DownloadFormValues
): NewDownload {
  let releaseDate: NewDownload["release_date"] = null;

  if (formData.releaseYear !== "") {
    const year = Number.parseInt(formData.releaseYear);

    if (formData.releaseMonth === "") {
      releaseDate = {
        year,
        month: null,
        day: null,
      };
    } else {
      releaseDate = {
        year,
        month: Number.parseInt(formData.releaseMonth),
        day:
          formData.releaseDay === ""
            ? null
            : Number.parseInt(formData.releaseDay),
      };
    }
  }

  const download: NewDownload = {
    artist_names: [
      formData.artistNames[0].value,
      ...formData.artistNames.slice(1).map((a) => a.value),
    ],
    track_name: formData.trackName,
    album_name: formData.albumName === "" ? null : formData.albumName,
    codec: formData.codec,
    bitrate: formData.bitrate,
    track_number:
      formData.trackNumber === ""
        ? null
        : Number.parseInt(formData.trackNumber),
    disc_number:
      formData.discNumber === "" ? null : Number.parseInt(formData.discNumber),
    url: formData.url,
    download_dir: formData.downloadDir,
    album_cover_path:
      formData.albumCoverPath === "" ? null : formData.albumCoverPath,
    release_date: releaseDate,
    genre: formData.genre,
    album_artist: formData.albumArtist,
  };

  return download;
}
