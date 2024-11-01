import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = responsiveFontSizes(
    createTheme({
        palette: {
            primary: {
                main: '#338E4E'
            },
            // secondary: {
            // },
            // third: {
            // },
            text: {
                primary: '#338E4E'
            }
        }, typography: {
            fontFamily: ['Sora', 'Courier', 'monospace'].join(',')
        }
    })
);

export default theme;

