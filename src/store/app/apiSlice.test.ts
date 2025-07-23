import { configureStore } from "@reduxjs/toolkit";
import { cocktailsApi } from "./apiSlice";
import { server } from "../../__mocks__/server";

// Create a test store
const createTestStore = () =>
  configureStore({
    reducer: {
      [cocktailsApi.reducerPath]: cocktailsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cocktailsApi.middleware),
  });

// Establish API mocking before all tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("cocktailsApi", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  describe("getCocktailByName endpoint", () => {
    it("should fetch cocktail data successfully for margarita", async () => {
      const result = await store.dispatch(
        cocktailsApi.endpoints.getCocktailByName.initiate("margarita")
      );

      expect(result.data).toEqual({
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
      });
    });

    it("should fetch multiple cocktail variants for mojito", async () => {
      const result = await store.dispatch(
        cocktailsApi.endpoints.getCocktailByName.initiate("mojito")
      );

      expect(result.data?.drinks).toHaveLength(2);
      expect(result.data?.drinks?.[0]?.strDrink).toBe("Mojito");
      expect(result.data?.drinks?.[1]?.strDrink).toBe("Virgin Mojito");
      expect(result.data?.drinks?.[0]?.strAlcoholic).toBe("Alcoholic");
      expect(result.data?.drinks?.[1]?.strAlcoholic).toBe("Non alcoholic");
    });

    it("should return null for non-existent cocktail", async () => {
      const result = await store.dispatch(
        cocktailsApi.endpoints.getCocktailByName.initiate("nonexistent")
      );

      expect(result.data).toEqual({ drinks: null });
    });

    it("should handle different cocktail names", async () => {
      const testCases = ["margarita", "mojito", "MARGARITA", "Mojito"];
      
      for (const cocktailName of testCases) {
        const result = await store.dispatch(
          cocktailsApi.endpoints.getCocktailByName.initiate(cocktailName)
        );
        
        expect(result.data?.drinks).not.toBeNull();
      }
    });

    it("should cache requests to prevent duplicate calls", async () => {
      // First call
      const result1 = await store.dispatch(
        cocktailsApi.endpoints.getCocktailByName.initiate("margarita")
      );
      
      // Second call with same parameter should use cache
      const result2 = await store.dispatch(
        cocktailsApi.endpoints.getCocktailByName.initiate("margarita")
      );
      
      expect(result1.data).toEqual(result2.data);
    });

    it("should handle empty string input", async () => {
      const result = await store.dispatch(
        cocktailsApi.endpoints.getCocktailByName.initiate("")
      );

      expect(result.data).toEqual({ drinks: null });
    });

    it("should handle API errors gracefully", async () => {
      // Test with a cocktail name that might cause an error
      const result = await store.dispatch(
        cocktailsApi.endpoints.getCocktailByName.initiate("unknown-cocktail")
      );

      // Should still return a valid response structure
      expect(result.data).toEqual({ drinks: null });
    });
  });

  describe("API slice configuration", () => {
    it("should have correct reducer path", () => {
      expect(cocktailsApi.reducerPath).toBe("cocktailsApi");
    });

    it("should export the hook correctly", () => {
      expect(cocktailsApi.useGetCocktailByNameQuery).toBeDefined();
      expect(typeof cocktailsApi.useGetCocktailByNameQuery).toBe("function");
    });
  });
}); 