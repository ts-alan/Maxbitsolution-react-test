import { transformDrinkIngredients, formatDrinkData } from './drinkTransformers';
import type { Drink } from '../store/app/types';

const mockDrink: Drink = {
  idDrink: "11007",
  strDrink: "Margarita",
  strCategory: "Ordinary Drink",
  strAlcoholic: "Alcoholic",
  strGlass: "Cocktail glass",
  strInstructions: "Rub the rim of the glass with lime slice.",
  strDrinkThumb: "margarita.jpg",
  strIngredient1: "Tequila",
  strMeasure1: "1 1/2 oz ",
  strIngredient2: "Triple sec",
  strMeasure2: "1/2 oz ",
  strIngredient3: "Lime juice",
  strMeasure3: "1 oz ",
  strIngredient4: null,
  strMeasure4: null,
} as Drink;

describe('drinkTransformers', () => {
  describe('transformDrinkIngredients', () => {
    it('should extract and format ingredients correctly', () => {
      const ingredients = transformDrinkIngredients(mockDrink);
      
      expect(ingredients).toHaveLength(3);
      expect(ingredients[0]).toEqual({
        ingredient: "Tequila",
        measure: "1 1/2 oz"
      });
      expect(ingredients[1]).toEqual({
        ingredient: "Triple sec",
        measure: "1/2 oz"
      });
      expect(ingredients[2]).toEqual({
        ingredient: "Lime juice",
        measure: "1 oz"
      });
    });

    it('should filter out null ingredients', () => {
      const drinkWithNulls: Partial<Drink> = {
        strIngredient1: "Vodka",
        strMeasure1: "1 oz",
        strIngredient2: null,
        strMeasure2: null,
      };
      
      const ingredients = transformDrinkIngredients(drinkWithNulls as Drink);
      expect(ingredients).toHaveLength(1);
      expect(ingredients[0]?.ingredient).toBe("Vodka");
    });
  });

  describe('formatDrinkData', () => {
    it('should format drink data correctly', () => {
      const formatted = formatDrinkData(mockDrink);
      
      expect(formatted).toEqual({
        name: "Margarita",
        category: "Ordinary Drink",
        type: "Alcoholic",
        glass: "Cocktail glass",
        instructions: "Rub the rim of the glass with lime slice.",
        image: "margarita.jpg",
        ingredients: [
          { ingredient: "Tequila", measure: "1 1/2 oz" },
          { ingredient: "Triple sec", measure: "1/2 oz" },
          { ingredient: "Lime juice", measure: "1 oz" }
        ]
      });
    });
  });
}); 