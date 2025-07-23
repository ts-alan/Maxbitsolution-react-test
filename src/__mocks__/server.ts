import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockDrinks = {
  margarita: {
    drinks: [
      {
        idDrink: "11007",
        strDrink: "Margarita",
        strCategory: "Ordinary Drink",
        strAlcoholic: "Alcoholic",
        strGlass: "Cocktail glass",
        strInstructions: "Rub the rim of the glass with lime slice...",
        strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/margarita.jpg",
        strIngredient1: "Tequila",
        strMeasure1: "1 1/2 oz",
        strIngredient2: "Triple sec",
        strMeasure2: "1/2 oz",
        strIngredient3: "Lime juice",
        strMeasure3: "1 oz",
      },
    ],
  },
  mojito: {
    drinks: [
      {
        idDrink: "11000",
        strDrink: "Mojito",
        strCategory: "Cocktail",
        strAlcoholic: "Alcoholic",
        strGlass: "Highball glass",
        strInstructions: "Muddle mint leaves with sugar and lime juice...",
        strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/mojito.jpg",
        strIngredient1: "Light rum",
        strMeasure1: "2-3 oz",
        strIngredient2: "Lime",
        strMeasure2: "Juice of 1",
        strIngredient3: "Sugar",
        strMeasure3: "2 tsp",
        strIngredient4: "Mint",
        strMeasure4: "2-4",
      },
      {
        idDrink: "11001",
        strDrink: "Virgin Mojito",
        strCategory: "Non-Alcoholic",
        strAlcoholic: "Non alcoholic",
        strGlass: "Highball glass",
        strInstructions: "Muddle mint leaves with sugar and lime juice...",
        strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/virgin-mojito.jpg",
        strIngredient1: "Lime",
        strMeasure1: "Juice of 1",
        strIngredient2: "Sugar",
        strMeasure2: "2 tsp",
        strIngredient3: "Mint",
        strMeasure3: "2-4",
      },
    ],
  },
};

const handlers = [
  http.get("https://www.thecocktaildb.com/api/json/v1/1/search.php", ({ request }) => {
    const url = new URL(request.url);
    const cocktailName = url.searchParams.get("s")?.toLowerCase();

    if (cocktailName && mockDrinks[cocktailName as keyof typeof mockDrinks]) {
      return HttpResponse.json(mockDrinks[cocktailName as keyof typeof mockDrinks]);
    }
    
    if (cocktailName === "nonexistent") {
      return HttpResponse.json({ drinks: null });
    }

    // Ответ по умолчанию для неизвестных коктейлей
    return HttpResponse.json({ drinks: null });
  }),
];

export const server = setupServer(...handlers); 