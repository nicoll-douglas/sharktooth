import { DownloadSettings, GeneralSettings } from "@/features/settings";
import PageHeading from "@/components/PageHeading";

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
