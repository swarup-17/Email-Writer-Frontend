import "@fontsource/poppins";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    background: {
      default: grey[200],
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    button: {
      textTransform: "none",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 660,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
