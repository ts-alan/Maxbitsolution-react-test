interface Drink {
    idDrink: string;
    strDrink: string;
    strCategory: string;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strDrinkThumb: string;
    [key: string]: string | undefined;
}

export interface CocktailsResponse {
    drinks: Drink[];
}