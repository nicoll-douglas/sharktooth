/**
 * Represents the reponses that may be returned from a get Spotify API auth URL backend API request.
 */
export type GetSpotifyApiAuthUrlResponse = {
  status: 200;
  body: {
    auth_url: string;
  };
};

/**
 * Represents the request body structure that must be sent with a post Spotify API auth code API request.
 */
export type PostSpotifyApiAuthCodeRequest = {
  auth_code: string;
};

/**
 * Represents the Spotify user profile data.
 */
export interface SpotifyUserProfile {
  /**
   * The user's display name / username.
   */
  display_name: string | null;

  /**
   * A URL for the user's profile image.
   */
  avatar: string | null;
}
