import type { Drink } from "../store/app/types";

// TheCocktailDB API provides up to 15 ingredients.
const MAX_INGREDIENTS = 15;

// Use Template Literal Types for precise key descriptions.
type IngredientKey = `strIngredient${number}`;
type MeasureKey = `strMeasure${number}`;

export interface DrinkIngredient {
  ingredient: string;
  measure: string;
}

// A simple type guard to filter out null/undefined values.
function isNotNull<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

/**
 * Transforms drink ingredients from API format to a clean array
 */
export function transformDrinkIngredients(drink: Drink): DrinkIngredient[] {
  return Array.from({ length: MAX_INGREDIENTS }, (_, i) => {
    const ingredient = drink[`strIngredient${i + 1}` as IngredientKey];
    const measure = drink[`strMeasure${i + 1}` as MeasureKey];

    return ingredient ? { 
      ingredient, 
      measure: measure?.trim() || "" 
    } : null;
  }).filter(isNotNull);
}

/**
 * Formats drink data for display
 */
export function formatDrinkData(drink: Drink) {
  return {
    name: drink.strDrink,
    category: drink.strCategory,
    type: drink.strAlcoholic,
    glass: drink.strGlass,
    instructions: drink.strInstructions,
    image: drink.strDrinkThumb,
    ingredients: transformDrinkIngredients(drink),
  };
} 