import { createTheme, type ThemeOptions } from '@mui/material/styles';

const themeOptions = {
    breakpoints: {
        values: {
            xs: 360,
            sm: 600,
            md: 900,
            lg: 1024,
            xl: 1536,
        },
    },
} satisfies ThemeOptions;

const theme = createTheme(themeOptions);

export default theme; 