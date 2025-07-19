import {
    useGetCocktailByNameQuery
} from './store/app/apiSlice';
import {AppBar as MuiAppBar, type AppBarProps as MuiAppBarProps, Box, IconButton, Toolbar, useMediaQuery, useTheme} from "@mui/material";
import { styled } from '@mui/material/styles';
import { SideMenu } from "./components/SideMenu";
import { CocktailDetails } from "./components/CocktailDetails";
import { useParams } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

const drawerWidth = 240;

const AppContainer = styled(Box)({
    display: 'flex',
    maxWidth: '1024px',
    minWidth: '360px',
    margin: '0 auto',
    position: 'relative',
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const MainContentContainer = styled('main')(({theme}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
    }
}));

function App() {
    const { cocktailName } = useParams<{ cocktailName: string }>();
    const {
        data,
        isFetching
    } = useGetCocktailByNameQuery(cocktailName || 'margarita');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(!isMobile);

    const handleDrawerToggle = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    };

    const drink = data?.drinks?.[0];

    return (
        <AppContainer>
            <AppBar position="absolute" open={isSideMenuOpen}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(isSideMenuOpen && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SideMenu
                isMobile={isMobile}
                isOpen={isSideMenuOpen}
                onClose={handleDrawerToggle}
            />
            <MainContentContainer>
                {isFetching ? (
                    <p>Loading...</p>
                ) : drink ? (
                    <CocktailDetails drink={drink} />
                ) : (
                    <NotFound />
                )}
            </MainContentContainer>
        </AppContainer>
    )
}

export default App
