import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#027e7b",
        light: '#ebf5f5'
      },
      // secondary: {
      // },
      // third: {
      // },
    },
    typography: {
      fontFamily: ["Sora", "Courier", "monospace"].join(","),
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 745,
        md: 900,
        lg: 1300,
        xl: 1820,
      },
    },
  })
);

export default theme;
