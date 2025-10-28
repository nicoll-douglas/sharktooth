import PageHeading from "@/components/PageHeading";
import {
  AuthPromptCard,
  AuthProvider,
  UserProfileCard,
} from "@/features/spotify-library";

export function meta() {
  return [{ title: `${import.meta.env.VITE_APP_NAME} | My Spotify Library` }];
}

export default function SpotifyLibrary() {
  return (
    <>
      <PageHeading>My Spotify Library</PageHeading>
      <AuthProvider>
        <AuthPromptCard />
        <UserProfileCard />
      </AuthProvider>
    </>
  );
}
