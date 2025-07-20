import { useGetCocktailByNameQuery } from "./store/app/apiSlice";
import {
  AppBar as MuiAppBar,
  type AppBarProps as MuiAppBarProps,
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SideMenu } from "./components/SideMenu";
import { CocktailDetails } from "./components/CocktailDetails";
import { Link, useParams } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { getMenuItemsData } from "./components/SideMenu/constants";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const AppContainer = styled(Box)({
  display: "flex",
  maxWidth: "1024px",
  minWidth: "360px",
  margin: "0 auto",
  position: "relative",
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  color: theme.palette.text.primary,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MainContentContainer = styled("main", {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<{ isMobile?: boolean }>(({ theme, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: isMobile ? theme.spacing(8) : 0,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

function App() {
  const { cocktailName } = useParams<{ cocktailName: string }>();
  const { data, isFetching } = useGetCocktailByNameQuery(
    cocktailName || "margarita",
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(!isMobile);
  const { t } = useTranslation();
  const menuItemsData = getMenuItemsData(t);

  const handleDrawerToggle = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const drink = data?.drinks?.[0];

  return (
    <AppContainer>
      <AppBar position="absolute" open={!isMobile && isSideMenuOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isSideMenuOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {isMobile &&
            menuItemsData.map(({ text, Icon, path }) => (
              <IconButton component={Link} to={path} key={text} color="inherit">
                <Icon />
              </IconButton>
            ))}
          <Box sx={{ flexGrow: 1 }} />
          <LanguageSwitcher />
        </Toolbar>
      </AppBar>
      {!isMobile && <SideMenu isOpen={isSideMenuOpen} />}
      <MainContentContainer isMobile={isMobile}>
        {isFetching ? (
          <LoadingSpinner />
        ) : drink ? (
          <CocktailDetails drink={drink} />
        ) : (
          <NotFound />
        )}
      </MainContentContainer>
    </AppContainer>
  );
}

export default App;
