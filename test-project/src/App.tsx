import { useGetCocktailByNameQuery } from './store/app/apiSlice';
import {useState} from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const AppContainer = styled(Box)({
    display: 'flex',
});

const StyledDrawer = styled(Drawer)({
    width: drawerWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

const MainContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  width: `calc(100% - ${drawerWidth}px)`,
}));

const DrinkDetailsContainer = styled(Box)({
    display: 'flex',
});

const TextContentWrapper = styled(Box)({
    flex: 1,
});

const ImageWrapper = styled(Box)(({ theme }) => ({
    position: 'sticky',
    top: theme.spacing(2),
    marginLeft: theme.spacing(3),
}));

const DrinkImage = styled('img')(({ theme }) => ({
    width: '240px',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
}));

const drinkTitleStyles = { mt: 0 };
const sectionTitleStyles = { mt: 2 };

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
      <AppContainer>
        <StyledDrawer variant="permanent">
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
        </StyledDrawer>
        <MainContentContainer>
            {isFetching ? (
                <p>Loading...</p>
            ) : drink ? (
                <DrinkDetailsContainer>
                    <TextContentWrapper>
                        <Typography variant="h4" gutterBottom sx={drinkTitleStyles}>{drink.strDrink}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">{drink.strCategory}</Typography>
                        <Typography variant="subtitle2" color="text.secondary">{drink.strAlcoholic}</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>{drink.strGlass}</Typography>

                        <Typography variant="h6" sx={sectionTitleStyles}>Instructions:</Typography>
                        <Typography variant="body1">{drink.strInstructions}</Typography>

                        <Typography variant="h6" sx={sectionTitleStyles}>List of ingredients:</Typography>
                        <List dense>
                            {ingredients.map((item, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemText primary={`${item.measure} ${item.ingredient}`} />
                                </ListItem>
                            ))}
                        </List>
                    </TextContentWrapper>
                    <ImageWrapper>
                        <DrinkImage
                            src={drink.strDrinkThumb}
                            alt={drink.strDrink}
                        />
                    </ImageWrapper>
                </DrinkDetailsContainer>
            ) : (
                <Typography variant="h5">Cocktail not found</Typography>
            )}
        </MainContentContainer>
    </AppContainer>
  )
}

export default App
