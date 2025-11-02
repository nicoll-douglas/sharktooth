import { DownloadSettings, GeneralSettings } from "@/features/settings";
import PageHeading from "@/components/PageHeading";

/**
 * Creates route metadata for React Router.
 *
 * @returns The metadata.
 */
export function meta() {
  return [{ title: `${import.meta.env.VITE_APP_NAME} | Settings` }];
}

/**
 * The application's settings page.
 */
export default function Settings() {
  return (
    <>
      <PageHeading>Settings</PageHeading>
      <DownloadSettings />
      <GeneralSettings />
    </>
  );
}
