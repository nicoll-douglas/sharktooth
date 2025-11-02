import { useContext, type Context } from "react";

/**
 * Hook to safely consume a potentially null React context value.
 *
 * @param context The context to be consumed
 * @throws If the hook is used outside the context provider where the context value is null.
 * @returns The non-null context value.
 */
export default function useSafeContext<T>(context: Context<T | null>): T {
  const contextValue = useContext(context);

  if (contextValue === null) {
    throw new Error("useSafeContext must be used inside its Provider");
  }

  return contextValue;
}
