import { DownloadSteps } from "@/features/download";
import PageHeading from "@/components/PageHeading";

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
