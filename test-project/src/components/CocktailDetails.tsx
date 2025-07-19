import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const DrinkDetailsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));

const TextContentWrapper = styled(Box)({
    flex: 1,
});

const ImageWrapper = styled(Box)(({ theme }) => ({
    position: 'sticky',
    top: theme.spacing(2),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        marginTop: theme.spacing(2),
        position: 'static',
        alignSelf: 'center',
    },
}));

const DrinkImage = styled('img')(({ theme }) => ({
    width: '240px',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
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

// TheCocktailDB API provides up to 15 ingredients.
const MAX_INGREDIENTS = 15;

export function CocktailDetails({ drink }: CocktailDetailsProps) {
    const ingredients = Array.from({ length: MAX_INGREDIENTS }, (_, i) => {
        const ingredient = drink[`strIngredient${i + 1}`];
        const measure = drink[`strMeasure${i + 1}`];
        return (ingredient) ? { ingredient, measure: measure?.trim() || '' } : null;
    }).filter((item): item is NonNullable<typeof item> => !!item);


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
                    loading="lazy"
                />
            </ImageWrapper>
        </DrinkDetailsContainer>
    );
} 