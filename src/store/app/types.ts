export type Drink = {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient1?: string | undefined;
  strIngredient2?: string | undefined;
  strIngredient3?: string | undefined;
  strIngredient4?: string | undefined;
  strIngredient5?: string | undefined;
  strIngredient6?: string | undefined;
  strIngredient7?: string | undefined;
  strIngredient8?: string | undefined;
  strIngredient9?: string | undefined;
  strIngredient10?: string | undefined;
  strIngredient11?: string | undefined;
  strIngredient12?: string | undefined;
  strIngredient13?: string | undefined;
  strIngredient14?: string | undefined;
  strIngredient15?: string | undefined;
  strMeasure1?: string | undefined;
  strMeasure2?: string | undefined;
  strMeasure3?: string | undefined;
  strMeasure4?: string | undefined;
  strMeasure5?: string | undefined;
  strMeasure6?: string | undefined;
  strMeasure7?: string | undefined;
  strMeasure8?: string | undefined;
  strMeasure9?: string | undefined;
  strMeasure10?: string | undefined;
  strMeasure11?: string | undefined;
  strMeasure12?: string | undefined;
  strMeasure13?: string | undefined;
  strMeasure14?: string | undefined;
  strMeasure15?: string | undefined;
  [key: string]: string | undefined;
};

export interface CocktailsResponse {
  drinks: Drink[] | null;
}
