import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b2c56", // Deep blue
    },
    secondary: {
      main: "#90CAF9", // Light blue
    },
    background: {
      default: "#FAFAFA", // Light neutral background
      paper: "#FFFFFF", // White card background
    },
    text: {
      primary: "#212121", // Dark gray text
      secondary: "#ababab", // Medium gray text
    },
    success: {
      main: "#4CAF50", // Vibrant green
    },
    error: {
      main: "#F44336", // Red shade for errors
    },
    info: {
      main: "#2196F3", // Blue shade for info
    },
    warning: {
      main: "#FFEB3B", // Yellow shade for warnings
    },
    divider: "#E0E0E0",
  },
});

export default theme;
