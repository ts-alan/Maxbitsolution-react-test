import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemText, Toolbar, ListItemIcon } from "@mui/material";
import { type CSSObject, type Theme, styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { menuItemsData } from "./constants";

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

interface SideMenuProps {
    isOpen: boolean;
}

export function SideMenu({ isOpen }: SideMenuProps) {
    const location = useLocation();

    const drawerContent = (
        <>
            <Toolbar />
            <List>
                {menuItemsData.map(({ text, Icon, path }) => (
                    <ListItem component={Link} to={path} key={text} disablePadding>
                        <ListItemButton selected={location.pathname === path}>
                            <ListItemIcon><Icon /></ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: isOpen ? 1 : 0 }}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Drawer
            variant='permanent'
            open={isOpen}
        >
            {drawerContent}
        </Drawer>
    );
} 