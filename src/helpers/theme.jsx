import { createTheme } from "@mui/material";

export const theme = () => {
    return createTheme({
        palette: {
            primary: {
                main: '#1C1B56',
                secondary: '#d4d4dd',
                border: '#d9d9d9',
                third: '#6C86E1',
                contrastText: '#d4d4dd',
            },
            secondary: {
                main: '#D7D7D7',
                secondary: '#efefef'
            },
            third: {
                main: "#F7F7F7",
                secondary: "#e3e3e3"
            }
        }, typography: {
            fontFamily: ['Sora', 'Courier', 'monospace'].join(',')
        }
    });

}