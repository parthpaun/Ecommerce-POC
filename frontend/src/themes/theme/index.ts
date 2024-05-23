// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

export default function Theme(colors) {
  const { blue, red, amber, cyan, green, grey } = colors;

  const contrastText = "#fff";

  return {
    primary: {
      ...blue,
      lighter: "#e6f4ff",
      light: blue["300"],
      main: blue["600"],
      dark: "#2E54EA",
      darker: "#10239e",
      contrastText,
    },
    secondary: {
      ...grey,
      lighter: "#ffffff",
      light: "#d9d9d9",
      main: "#8c8c8c",
      dark: "#262626",
      darker: "#000000",
      contrastText: "#ffffff",
    },
    error: {
      ...red,
      lighter: "#fff1f0",
      light: "#ffa39e",
      main: "#ff4d4f",
      dark: "#a8071a",
      darker: "#5c0011",
      contrastText,
    },
    warning: {
      ...amber,
      lighter: "#fffbe6",
      light: "#ffd666",
      main: "#faad14",
      dark: "#ad6800",
      darker: "#613400",
      contrastText: grey[100],
    },
    info: {
      ...cyan,
      lighter: "#e6fffb",
      light: "#5cdbd3",
      main: "#13c2c2",
      dark: "#006d75",
      darker: "#002329",
      contrastText,
    },
    success: {
      ...green,
      lighter: "#f6ffed",
      light: "#95de64",
      main: "#52c41a",
      dark: "#237804",
      darker: "#092b00",
      contrastText,
    },
    grey: grey,
  };
}
