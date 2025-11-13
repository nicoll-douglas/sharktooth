import PageHeading from "@/components/PageHeading";
import {
  AuthPromptCard,
  AuthProvider,
  UserProfileCard,
  PlaylistList,
} from "@/features/spotify-library";

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
