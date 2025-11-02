import { createContext, type ReactNode } from "react";
import useSafeContext from "@/hooks/useSafeContext";
import useIsAuthenticated from "../hooks/useIsAuthenticated";
import type { UseQueryResult } from "@tanstack/react-query";

/**
 * The Spotify API auth context.
 */
export const AuthContext = createContext<UseQueryResult<boolean, Error> | null>(
  null
);

/**
 * Provider for the Spotify API auth context.
 *
 * Provides a shareable set of values returned from a useIsAuthenticated hook call.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const contextValue = useIsAuthenticated();

  return <AuthContext value={contextValue}>{children}</AuthContext>;
}

/**
 * Hook to use the Spotify API auth context.
 *
 * @returns The context value.
 */
export function useAuthContext() {
  return useSafeContext<UseQueryResult<boolean, Error>>(AuthContext);
}
