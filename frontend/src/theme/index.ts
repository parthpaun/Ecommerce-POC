import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Light mode theme
    primary: {
      main: "#111827", // Purple (Sidebar highlight)
    },
    secondary: {
      main: "#6366F1", // Light gray (Background)
    },
    background: {
      default: "#F9FAFB", // Light background
      paper: "#FFFFFF", // White cards
    },
    text: {
      primary: "#111827", // Dark text
      secondary: "#FFFFFF", // Gray text
    },
  },
  typography: {
    // Ensure you import Inter font

    h1: {
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.3,
    },
    h2: {
      fontWeight: 700,
      fontSize: "1.875rem",
      lineHeight: 1.4,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.5,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.6,
    },
    h5: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.7,
    },
    h6: {
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: 1.8,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.75,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
    },
    body1: {
      fontSize: "0.875rem",
    },
    },
    components: {
    MuiDrawer: {
      styleOverrides: {
      paper: {
      backgroundColor: "#111827", // Sidebar dark background
          color: "#FFFFFF",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input::placeholder": {
            color: "#9CA3AF !important", // Gray color for placeholder
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "gray",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F3F4F6",
        },
      },
    },
  },
});

export default theme;
