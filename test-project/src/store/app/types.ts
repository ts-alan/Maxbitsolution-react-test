interface Drink {
    idDrink: string;
    strDrink: string;
    strInstructions: string;
    strDrinkThumb: string;
}

export interface CocktailsResponse {
    drinks: Drink[];
}