import { useGetCocktailByNameQuery } from './store/app/apiSlice';
import {useState} from "react";
import {
    Box,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
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

    const drink = data?.drinks?.[0];

    const ingredients = [];
    if (drink) {
        for (let i = 1; i <= 15; i++) {
            const ingredientKey = `strIngredient${i}` as keyof typeof drink;
            const measureKey = `strMeasure${i}` as keyof typeof drink;
            const ingredient = drink[ingredientKey];
            const measure = drink[measureKey];
            if (ingredient) {
                ingredients.push({ ingredient, measure: measure?.trim() || '' });
            }
        }
    }

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
        ) : drink ? (
            <>
                <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    style={{
                        position: 'fixed',
                        top: '16px',
                        right: '16px',
                        width: '120px',
                        height: 'auto',
                        borderRadius: '8px',
                        zIndex: 1,
                    }}
                />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>{drink.strDrink}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">{drink.strCategory}</Typography>
                        <Typography variant="subtitle2" color="text.secondary">{drink.strAlcoholic}</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>{drink.strGlass}</Typography>

                        <Typography variant="h6" sx={{ mt: 2 }}>Instructions:</Typography>
                        <Typography variant="body1">{drink.strInstructions}</Typography>

                        <Typography variant="h6" sx={{ mt: 2 }}>List of ingredients:</Typography>
                        <List dense>
                            {ingredients.map((item, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemText primary={`${item.measure} ${item.ingredient}`} />
                                </ListItem>
                            ))}
                        </List>
                </Grid>
            </Grid>
            </>
        ) : (
            <Typography variant="h5">Cocktail not found</Typography>
        )}
    </MainContentContainer>
    </Box>
  )
}

export default App
