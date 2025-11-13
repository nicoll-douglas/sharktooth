import PageHeading from "@/components/PageHeading";
import { DownloadsTables } from "@/features/view-downloads";

/**
 * A page that gives the user real-time data about downloads within the application.
 */
export default function Downloads() {
  return (
    <>
      <PageHeading>Downloads</PageHeading>
      <DownloadsTables />
    </>
  );
}
