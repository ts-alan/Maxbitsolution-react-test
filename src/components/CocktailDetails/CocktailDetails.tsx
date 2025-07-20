import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { Drink } from "../../store/app/types";
import { formatDrinkData } from "../../utils/drinkTransformers";


const DrinkDetailsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const TextContentWrapper = styled(Box)({
  flex: 1,
});

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: theme.spacing(2),
  marginLeft: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
    marginTop: theme.spacing(2),
    position: "static",
    alignSelf: "center",
  },
}));

const DrinkImage = styled("img")(({ theme }) => ({
  width: "240px",
  height: "auto",
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const drinkTitleStyles = { mt: 0 };
const sectionTitleStyles = { mt: 2 };

interface CocktailDetailsProps {
  drink: Drink;
  translations: {
    category: string;
    type: string;
    glass: string;
    instructions: string;
    ingredients: string;
  };
}

export function CocktailDetails({ drink, translations }: CocktailDetailsProps) {
  const drinkData = formatDrinkData(drink);

  return (
    <DrinkDetailsContainer>
      <TextContentWrapper>
        <Typography variant="h4" gutterBottom sx={drinkTitleStyles}>
          {drinkData.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {translations.category}: {drinkData.category}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {translations.type}: {drinkData.type}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {translations.glass}: {drinkData.glass}
        </Typography>

        <Typography variant="h6" sx={sectionTitleStyles}>
          {translations.instructions}:
        </Typography>
        <Typography variant="body1">{drinkData.instructions}</Typography>

        <Typography variant="h6" sx={sectionTitleStyles}>
          {translations.ingredients}:
        </Typography>
        <List dense>
          {drinkData.ingredients.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={`${item.measure} ${item.ingredient}`} />
            </ListItem>
          ))}
        </List>
      </TextContentWrapper>
      <ImageWrapper>
        <DrinkImage
          src={drinkData.image}
          alt={drinkData.name}
          loading="lazy"
        />
      </ImageWrapper>
    </DrinkDetailsContainer>
  );
}
