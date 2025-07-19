import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 360,
            sm: 600,
            md: 900,
            lg: 1024,
            xl: 1536,
        },
    },
});

export default theme; 