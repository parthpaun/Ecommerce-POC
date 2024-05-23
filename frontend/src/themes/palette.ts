// material-ui
import { createTheme } from "@mui/material/styles";
import { blue, red, amber, cyan, green, grey } from "@mui/material/colors";

// third-party
// import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from "./theme";

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

export default function Palette(mode, presetColor) {
  const colors = { blue, red, amber, cyan, green, grey };
  const paletteColor = ThemeOption(colors, presetColor, mode);

  return createTheme({
    palette: {
      mode,
      common: {
        black: "#000",
        white: "#fff",
      },
      ...paletteColor,
      text: {
        primary: paletteColor.grey[700],
        secondary: paletteColor.grey[500],
        disabled: paletteColor.grey[400],
      },
      action: {
        disabled: paletteColor.grey[300],
      },
      divider: paletteColor.grey[200],
      background: {
        paper: paletteColor.grey[0],
        default: paletteColor.grey.A50,
      },
    },
  });
}
