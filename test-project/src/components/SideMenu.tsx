import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)({
    width: drawerWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

interface SideMenuProps {
    onSelectItem: (item: string) => void;
    activeItem: string;
}

const menuItems = ['Margarita', 'Mojito', "A1", "Kir"];

export function SideMenu() {
    const location = useLocation();

    return (
        <StyledDrawer variant="permanent">
            <Toolbar />
            <List>
                {menuItems.map((text) => (
                    <ListItem component={Link} to={`/${text.toLowerCase()}`} key={text} disablePadding>
                        <ListItemButton selected={location.pathname === `/${text.toLowerCase()}`}>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </StyledDrawer>
    );
} 