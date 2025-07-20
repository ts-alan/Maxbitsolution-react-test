type IngredientKey = `strIngredient${number}`;
type MeasureKey = `strMeasure${number}`;

export type Drink = {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
} & {
  [K in IngredientKey | MeasureKey]?: string | null;
};

export interface CocktailsResponse {
  drinks: Drink[];
}
