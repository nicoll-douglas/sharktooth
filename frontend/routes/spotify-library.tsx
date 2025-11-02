import PageHeading from "@/components/PageHeading";
import {
  AuthPromptCard,
  AuthProvider,
  UserProfileCard,
  PlaylistList,
} from "@/features/spotify-library";

/**
 * Creates route metadata for React Router.
 *
 * @returns The metadata.
 */
export function meta() {
  return [{ title: `${import.meta.env.VITE_APP_NAME} | My Spotify Library` }];
}

/**
 * A page that contains a flow for the user to authenticate with Spotify and download Spotify playlists.
 */
export default function SpotifyLibrary() {
  return (
    <>
      <PageHeading>My Spotify Library</PageHeading>
      <AuthProvider>
        <AuthPromptCard />
        <UserProfileCard />
        <PlaylistList />
      </AuthProvider>
    </>
  );
}
