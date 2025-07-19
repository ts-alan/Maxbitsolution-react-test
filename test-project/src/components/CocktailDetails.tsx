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

// TheCocktailDB API provides up to 15 ingredients.
const MAX_INGREDIENTS = 15;

// Use Template Literal Types for precise key descriptions.
type IngredientKey = `strIngredient${number}`;
type MeasureKey = `strMeasure${number}`;

interface Drink {
    strDrink: string;
    strCategory: string;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strDrinkThumb: string;
    [key: IngredientKey | MeasureKey]: string | null | undefined;
}

interface CocktailDetailsProps {
    drink: Drink;
}

interface Ingredient {
    ingredient: string;
    measure: string;
}

// A simple type guard to filter out null/undefined values.
function isNotNill<T>(value: T): value is NonNullable<T> {
    return value !== null && value !== undefined;
}

export function CocktailDetails({ drink }: CocktailDetailsProps) {
    const ingredients = Array.from({ length: MAX_INGREDIENTS }, (_, i) => {
        const ingredient = drink[`strIngredient${i + 1}` as IngredientKey];
        const measure = drink[`strMeasure${i + 1}` as MeasureKey];

        return ingredient ? { ingredient, measure: measure?.trim() || '' } : null;
    }).filter(isNotNill);


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