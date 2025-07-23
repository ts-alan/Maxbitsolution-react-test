import type { Drink } from "../store/app/types";

export function formatDrinkData(drink: Drink) {
  const ingredients = [];

  // Extract ingredients and their measurements
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}` as keyof Drink];
    const measure = drink[`strMeasure${i}` as keyof Drink];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return {
    name: drink.strDrink,
    category: drink.strCategory,
    type: drink.strAlcoholic,
    glass: drink.strGlass,
    instructions: drink.strInstructions,
    image: drink.strDrinkThumb,
    ingredients,
  };
}
