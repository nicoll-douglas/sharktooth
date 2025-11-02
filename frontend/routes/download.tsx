import { DownloadSteps } from "@/features/download";
import PageHeading from "@/components/PageHeading";

/**
 * Creates route metadata for React Router.
 *
 * @returns The metadata.
 */
export function meta() {
  return [{ title: `${import.meta.env.VITE_APP_NAME} | New Download` }];
}

/**
 * A page that provides a flow to download a track.
 */
export default function Download() {
  return (
    <>
      <PageHeading>New Download</PageHeading>
      <DownloadSteps />
    </>
  );
}
