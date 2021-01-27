import React, { useEffect } from 'react';
import { createMuiTheme, MuiThemeProvider, useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainLayout from './components/MainLayout';

const themeDark = (prefersDarkMode: boolean) =>
    createMuiTheme({
        palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            // background: {
            //     default: '#222222',
            // },
            // text: {
            //     primary: '#ffffff',
            // },
            // darkBG: {
            //     main: blueGrey[900],
            // },
            secondary: {
                light: '#a98274',
                main: '#795548',
                dark: '#4b2c20',
                contrastText: '#ffffff',
            },
        },
    });

const App = (): JSX.Element => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [light, setLight] = React.useState(prefersDarkMode);
    const theme = themeDark(light);

    window.addEventListener('isUpdateAvailabel', (test: any) => {
        // Information to show when updates are here for this app..
        test;
    });

    useEffect(() => {
        setLight(prefersDarkMode);
    }, [prefersDarkMode]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout />
        </MuiThemeProvider>
    );
};

export default App;
