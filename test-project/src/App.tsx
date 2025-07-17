import { useGetCocktailByNameQuery } from './store/app/apiSlice';
import {useState} from "react";
import {Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar} from "@mui/material";

function App() {
    const [menuItem, setMenuItem] = useState('margarita');

    const {
        data,
        error,
        isLoading,
    } = useGetCocktailByNameQuery(menuItem);

  return (
    <>
    <Drawer
        open
        variant="permanent" >
        <Toolbar>
        <List>
            {['Margarita', 'Mojito', "A1", "Kir"].map((text) => (
                <ListItem key={text}>
                    <ListItemButton>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        </Toolbar>
    </Drawer>
    <div style={{ marginLeft: 240, padding: 16 }}>
        <h1>Контент справа</h1>
    </div>
    </>
  )
}

export default App
