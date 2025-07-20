import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import config from "../config";

const mockDrink = {
  drinks: [
    {
      strDrink: "Margarita",
      strCategory: "Ordinary Drink",
      strAlcoholic: "Alcoholic",
      strGlass: "Cocktail glass",
      strInstructions: "Rub the rim of the glass with lime slice...",
      strDrinkThumb: "margarita.jpg",
      strIngredient1: "Tequila",
      strMeasure1: "1 1/2 oz",
    },
  ],
};

const handlers = [
  http.get(
    `${config.api.baseUrl}search.php`,
    ({ request }) => {
      const url = new URL(request.url);
      const cocktailName = url.searchParams.get("s");

      if (cocktailName?.toLowerCase() === "margarita") {
        return HttpResponse.json(mockDrink);
      }
      return HttpResponse.json({ drinks: null });
    },
  ),
];

export const server = setupServer(...handlers);
