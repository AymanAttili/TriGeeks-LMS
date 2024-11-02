import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = responsiveFontSizes(
    createTheme({
        palette: {
            primary: {
                main: '#027e7b'
            },
            // secondary: {
            // },
            // third: {
            // },

        }, typography: {
            fontFamily: ['Sora', 'Courier', 'monospace'].join(',')
        }
    })
);

export default theme;

