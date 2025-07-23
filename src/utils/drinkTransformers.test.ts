import { formatDrinkData } from "./drinkTransformers";
import type { Drink } from "../store/app/types";

const mockDrink: Drink = {
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
  strIngredient4: "",
  strMeasure4: "",
  strIngredient5: undefined,
  strMeasure5: undefined,
};

describe("formatDrinkData", () => {
  it("should format basic drink data correctly", () => {
    const result = formatDrinkData(mockDrink);
    
    expect(result.name).toBe("Margarita");
    expect(result.category).toBe("Ordinary Drink");
    expect(result.type).toBe("Alcoholic");
    expect(result.glass).toBe("Cocktail glass");
    expect(result.instructions).toBe("Rub the rim of the glass with lime slice...");
    expect(result.image).toBe("https://www.thecocktaildb.com/images/media/drink/margarita.jpg");
  });

  it("should extract ingredients and measures correctly", () => {
    const result = formatDrinkData(mockDrink);
    
    expect(result.ingredients).toHaveLength(3);
    expect(result.ingredients[0]).toEqual({
      ingredient: "Tequila",
      measure: "1 1/2 oz",
    });
    expect(result.ingredients[1]).toEqual({
      ingredient: "Triple sec",
      measure: "1/2 oz",
    });
    expect(result.ingredients[2]).toEqual({
      ingredient: "Lime juice",
      measure: "1 oz",
    });
  });

  it("should handle ingredients without measures", () => {
    const drinkWithoutMeasures: Drink = {
      ...mockDrink,
      strMeasure1: "",
      strMeasure2: undefined,
      strMeasure3: "   ", // whitespace only
    };
    
    const result = formatDrinkData(drinkWithoutMeasures);
    
    expect(result.ingredients).toHaveLength(3);
    expect(result.ingredients[0]).toEqual({
      ingredient: "Tequila",
      measure: "",
    });
    expect(result.ingredients[1]).toEqual({
      ingredient: "Triple sec",
      measure: "",
    });
    expect(result.ingredients[2]).toEqual({
      ingredient: "Lime juice",
      measure: "",
    });
  });

  it("should skip empty or undefined ingredients", () => {
    const drinkWithEmptyIngredients: Drink = {
      ...mockDrink,
      strIngredient1: "Tequila",
      strIngredient2: "",
      strIngredient3: "   ", // whitespace only
      strIngredient4: undefined,
      strIngredient5: "Lime juice",
    };
    
    const result = formatDrinkData(drinkWithEmptyIngredients);
    
    expect(result.ingredients).toHaveLength(2);
    expect(result.ingredients[0]?.ingredient).toBe("Tequila");
    expect(result.ingredients[1]?.ingredient).toBe("Lime juice");
  });

  it("should trim whitespace from ingredients and measures", () => {
    const drinkWithWhitespace: Drink = {
      ...mockDrink,
      strIngredient1: "  Tequila  ",
      strMeasure1: "  1 1/2 oz  ",
      strIngredient2: " Triple sec ",
      strMeasure2: " 1/2 oz ",
    };
    
    const result = formatDrinkData(drinkWithWhitespace);
    
    expect(result.ingredients[0]).toEqual({
      ingredient: "Tequila",
      measure: "1 1/2 oz",
    });
    expect(result.ingredients[1]).toEqual({
      ingredient: "Triple sec",
      measure: "1/2 oz",
    });
  });

  it("should handle all 15 possible ingredients", () => {
    const drinkWithManyIngredients: Drink = {
      ...mockDrink,
      strIngredient1: "Ingredient 1",
      strIngredient2: "Ingredient 2",
      strIngredient3: "Ingredient 3",
      strIngredient4: "Ingredient 4",
      strIngredient5: "Ingredient 5",
      strIngredient6: "Ingredient 6",
      strIngredient7: "Ingredient 7",
      strIngredient8: "Ingredient 8",
      strIngredient9: "Ingredient 9",
      strIngredient10: "Ingredient 10",
      strIngredient11: "Ingredient 11",
      strIngredient12: "Ingredient 12",
      strIngredient13: "Ingredient 13",
      strIngredient14: "Ingredient 14",
      strIngredient15: "Ingredient 15",
    };
    
    const result = formatDrinkData(drinkWithManyIngredients);
    
    expect(result.ingredients).toHaveLength(15);
    expect(result.ingredients[0]?.ingredient).toBe("Ingredient 1");
    expect(result.ingredients[14]?.ingredient).toBe("Ingredient 15");
  });

  it("should handle drink with no ingredients", () => {
    const drinkWithNoIngredients: Drink = {
      ...mockDrink,
      strIngredient1: "",
      strIngredient2: undefined,
      strIngredient3: "   ",
    };
    
    const result = formatDrinkData(drinkWithNoIngredients);
    
    expect(result.ingredients).toHaveLength(0);
  });

  it("should handle drink with missing optional fields", () => {
    const minimalDrink: Drink = {
      idDrink: "123",
      strDrink: "Test Drink",
      strCategory: "Test Category",
      strAlcoholic: "Non alcoholic",
      strGlass: "Test Glass",
      strInstructions: "Test instructions",
      strDrinkThumb: "test.jpg",
    };
    
    const result = formatDrinkData(minimalDrink);
    
    expect(result.name).toBe("Test Drink");
    expect(result.category).toBe("Test Category");
    expect(result.type).toBe("Non alcoholic");
    expect(result.glass).toBe("Test Glass");
    expect(result.instructions).toBe("Test instructions");
    expect(result.image).toBe("test.jpg");
    expect(result.ingredients).toHaveLength(0);
  });

  it("should preserve measure when ingredient is present but measure is empty", () => {
    const drinkWithEmptyMeasure: Drink = {
      idDrink: "123",
      strDrink: "Test Drink",
      strCategory: "Test Category",
      strAlcoholic: "Non alcoholic",
      strGlass: "Test Glass",
      strInstructions: "Test instructions",
      strDrinkThumb: "test.jpg",
      strIngredient1: "Salt",
      strMeasure1: "",
    };
    
    const result = formatDrinkData(drinkWithEmptyMeasure);
    
    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]).toEqual({
      ingredient: "Salt",
      measure: "",
    });
  });
}); 