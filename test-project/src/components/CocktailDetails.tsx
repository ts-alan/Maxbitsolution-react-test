import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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

interface Drink {
    strDrink: string;
    strCategory: string;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strDrinkThumb: string;
    [key: string]: string | undefined;
}

interface CocktailDetailsProps {
    drink: Drink;
}

export function CocktailDetails({ drink }: CocktailDetailsProps) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        const ingredient = drink[ingredientKey];
        const measure = drink[measureKey];
        if (ingredient) {
            ingredients.push({ ingredient, measure: measure?.trim() || '' });
        }
    }

    return (
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
    );
} 