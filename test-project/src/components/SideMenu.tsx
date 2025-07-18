import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

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
}

const menuItems = ['Margarita', 'Mojito', "A1", "Kir"];

export function SideMenu({ onSelectItem }: SideMenuProps) {
    return (
        <StyledDrawer variant="permanent">
            <Toolbar />
            <List>
                {menuItems.map((text) => (
                    <ListItem onClick={() => onSelectItem(text.toLowerCase())} key={text}>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </StyledDrawer>
    );
} 