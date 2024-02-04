export const DEFAULT_THEME = {
  colors: {
    primary: "#1a1a1a", // Dark color for text
    background: "#ffffff", // White background
    header: "#ffffff", // Light grey background for the header
    border: "#e1e1e1", // Light grey border color
    hover: "#f9f9f9", // Slightly dark grey for hover states
    text: "#333333", // Dark grey text color
  },
  fontFamilies: {
    primary: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif`,
  },
  spacing: [
    "4px",
    "8px",
    "12px",
    "16px",
    "24px",
    "32px",
    "48px",
    "64px",
    "96px",
    "128px",
    "192px",
    "256px",
    "384px",
    "512px",
    "640px",
  ],
  borders: {
    normal: "1px solid",
  },
  fontSizes: {
    normal: "16px",
    header: "16px",
  },
  radii: {
    small: "4px",
  },
};

export type DefaultTheme = typeof DEFAULT_THEME;
