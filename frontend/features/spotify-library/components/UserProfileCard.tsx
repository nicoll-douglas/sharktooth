import * as Ch from "@chakra-ui/react";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useAuthContext } from "../context/AuthContext";
import useIsAuthenticated from "../hooks/useIsAuthenticated";

/**
 * Represents a card that prompts the user to authenticate with the Spotify API.
 */
export default function UserProfileCard() {
  const { data: userProfile, isLoading: profileLoading } = useGetUserProfile();
  const { data: isAuth } = useIsAuthenticated();

  if (userProfile === null || !isAuth) return;

  return (
    <Ch.Card.Root size={"sm"}>
      <Ch.Card.Body>
        <Ch.Skeleton loading={profileLoading || userProfile === undefined}>
          <Ch.HStack gap={"2"}>
            <Ch.Text>Logged in as</Ch.Text>

            {userProfile?.display_name && (
              <Ch.Text>{userProfile.display_name}</Ch.Text>
            )}

            <Ch.Avatar.Root size={"xs"}>
              <Ch.Avatar.Fallback
                name={userProfile?.display_name || undefined}
              />
              <Ch.Avatar.Image src={userProfile?.avatar_url || undefined} />
            </Ch.Avatar.Root>
          </Ch.HStack>
        </Ch.Skeleton>
      </Ch.Card.Body>
    </Ch.Card.Root>
  );
}
