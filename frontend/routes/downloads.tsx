import PageHeading from "@/components/PageHeading";
import { DownloadsTables } from "@/features/view-downloads";

/**
 * Creates route metadata for React Router.
 *
 * @returns The metadata.
 */
export function meta() {
  return [{ title: `${import.meta.env.VITE_APP_NAME} | Downloads` }];
}

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
