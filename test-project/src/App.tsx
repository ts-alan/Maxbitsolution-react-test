import { useGetCocktailByNameQuery } from './store/app/apiSlice';
import {useState} from "react";
import {Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar} from "@mui/material";
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const MainContentContainer = styled(Box)(({ theme }) => ({
  marginLeft: `${drawerWidth}px`,
  padding: theme.spacing(3),
  width: `calc(100% - ${drawerWidth}px)`,
}));

function App() {
    const [menuItem, setMenuItem] = useState('margarita');

    const {
        data,
        error,
        isLoading,
        isFetching
    } = useGetCocktailByNameQuery(menuItem);

  return (
    <Box sx={{ display: 'flex' }}>
    <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        >
        <Toolbar />
        <List>
            {['Margarita', 'Mojito', "A1", "Kir"].map((text) => (
                <ListItem onClick={() => setMenuItem(text.toLowerCase())} key={text}>
                    <ListItemButton>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </Drawer>
    <MainContentContainer>
        {isFetching ? (
            <p>Loading...</p>
        ) : data?.drinks?.[0] ? (
            <>
                <h1>{data.drinks[0].strDrink}</h1>
                <p>{data.drinks[0].strInstructions}</p>
                <img src={data.drinks[0].strDrinkThumb} alt={data.drinks[0].strDrink} style={{ maxWidth: 300, height: 'auto' }} />
            </>
        ) : (
            <h1>Cocktail not found</h1>
        )}
    </MainContentContainer>
    </Box>
  )
}

export default App
