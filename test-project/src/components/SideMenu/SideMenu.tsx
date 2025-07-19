import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemText, Toolbar, ListItemIcon } from "@mui/material";
import { type CSSObject, type Theme, styled } from "@mui/material/styles";
import { type JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import MargaritaIcon from '@mui/icons-material/LocalBar';
import MojitoIcon from '@mui/icons-material/LocalDrink';
import A1Icon from '@mui/icons-material/WineBar';
import KirIcon from '@mui/icons-material/Liquor';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface SideMenuItem {
    text: string;
    icon: JSX.Element;
    path: string;
}

interface SideMenuProps {
    isMobile: boolean;
    isOpen: boolean;
    onClose: () => void;
}

const menuItems: readonly SideMenuItem[] = [
    { text: 'Margarita', icon: <MargaritaIcon />, path: '/margarita' },
    { text: 'Mojito', icon: <MojitoIcon />, path: '/mojito' },
    { text: 'A1', icon: <A1Icon />, path: '/a1' },
    { text: 'Kir', icon: <KirIcon />, path: '/kir' }
];

export function SideMenu({ isMobile, isOpen, onClose }: SideMenuProps) {
    const location = useLocation();

    const drawerContent = (
        <>
            <Toolbar />
            <List>
                {menuItems.map((item) => (
                    <ListItem component={Link} to={item.path} key={item.text} disablePadding>
                        <ListItemButton selected={location.pathname === item.path} onClick={isMobile ? onClose : undefined}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} sx={{ opacity: isOpen ? 1 : 0 }}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isOpen}
            onClose={onClose}
            ModalProps={{
                keepMounted: true, 
            }}
        >
            {drawerContent}
        </Drawer>
    );
} 