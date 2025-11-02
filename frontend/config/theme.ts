import { defaultConfig, createSystem, defineConfig } from "@chakra-ui/react";

/**
 * The application's Chakra UI theme configuration.
 */
const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "blue",
    },
  },
  theme: {
    tokens: {
      fonts: {
        body: {
          value: "Orbitron, sans-serif",
        },
        heading: {
          value: "Orbitron, sans-serif",
        },
      },
    },
  },
});

/**
 * The application's Chakra UI styling engine.
 */
export const system = createSystem(defaultConfig, config);
