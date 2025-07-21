import {
  AppBar as MuiAppBar,
  type AppBarProps as MuiAppBarProps,
  Box,
  IconButton,
  Toolbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SideMenuContainer } from '../SideMenu';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

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
  backgroundColor: 'transparent',
  boxShadow: 'none',
  color: theme.palette.text.primary,
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

const MainContentContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: isMobile ? theme.spacing(8) : 0,
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
}));

interface LayoutProps {
  children: ReactNode;
  isMobile: boolean;
  isSideMenuOpen: boolean;
  menuItemsData: Array<{
    text: string;
    Icon: React.ComponentType;
    path: string;
    code: string;
  }>;
  // удалил onDrawerToggle
}

export function Layout({ 
  children, 
  isMobile, 
  isSideMenuOpen, 
  menuItemsData
}: LayoutProps) {

  return (
    <AppContainer>
      <AppBar position="absolute" open={!isMobile && isSideMenuOpen}>
        <Toolbar>
          {isMobile &&
            menuItemsData.map(({ text, Icon, path }) => (
              <IconButton component={Link} to={path} key={text} color="inherit">
                <Icon />
              </IconButton>
            ))}
        </Toolbar>
      </AppBar>
      {!isMobile && <SideMenuContainer isOpen={isSideMenuOpen} />}
      <MainContentContainer isMobile={isMobile}>
        {children}
      </MainContentContainer>
    </AppContainer>
  );
} 