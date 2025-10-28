import * as Ch from "@chakra-ui/react";
import useIsAuthenticated from "../hooks/useIsAuthenticated";
import useGetUserProfile from "../hooks/useGetUserProfile";

/**
 * Represents a card that prompts the user to authenticate with the Spotify API.
 */
export default function UserProfileCard() {
  const { data: isAuthenticated, isLoading: authLoading } =
    useIsAuthenticated();
  const { data, isLoading: profileLoading } = useGetUserProfile();

  if (isAuthenticated === false) return;

  return (
    <Ch.Card.Root size={"sm"}>
      <Ch.Card.Body>
        <Ch.Skeleton loading={authLoading || profileLoading}>
          <Ch.HStack gap={"4"}>
            <Ch.Text>Logged in as</Ch.Text>

            <Ch.Separator orientation={"vertical"} height={"4"} />

            <Ch.HStack gap={"2"}>
              <Ch.Text>{data?.display_name}</Ch.Text>
              <Ch.Avatar.Root size={"xs"}>
                <Ch.Avatar.Fallback name={data?.display_name || undefined} />
                <Ch.Avatar.Image src={data?.avatar_url || undefined} />
              </Ch.Avatar.Root>
            </Ch.HStack>
          </Ch.HStack>
        </Ch.Skeleton>
      </Ch.Card.Body>
    </Ch.Card.Root>
  );
}
