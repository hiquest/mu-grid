export const DEFAULT_THEME = {
  colors: {
    primary: "#1a1a1a",
    background: "#ffffff",
    border: "#e1e1e1",
    hover: "#f9f9f9",
    text: "#333333",
    textLight: "#aaa",

    // header
    headerBg: "#ffffff",
    headerText: "#656565",

    // icon button
    iconBtnHoverBg: "rgba(0, 0, 0, 0.04)",
    iconBtnActiveBg: "rgba(0, 0, 0, 0.08)",
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
  transitions: {
    normal: "0.25s",
  },
};

export type DefaultTheme = typeof DEFAULT_THEME;
