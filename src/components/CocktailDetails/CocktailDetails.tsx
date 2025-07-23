import type { Drink } from "../../store/app/types";
import { formatDrinkData } from "../../utils/drinkTransformers";

interface CocktailDetailsProps {
  drink: Drink;
}

export function CocktailDetails({ drink }: CocktailDetailsProps) {
  const drinkData = formatDrinkData(drink);

  return (
    <div className="cocktail-details">
      <div className="cocktail-image">
        {drinkData.image ? (
          <img
            src={drinkData.image}
            alt={drinkData.name}
            loading="lazy"
          />
        ) : (
          'strDrinkThumb'
        )}
      </div>
      
      <div className="cocktail-info">
        <div className="cocktail-name">{drinkData.name}</div>
        
        <div className="cocktail-meta">
          <div>strCategory: {drinkData.category}</div>
          <div>strAlcoholic: {drinkData.type}</div>
          <div>strGlass: {drinkData.glass}</div>
        </div>

        <div className="section-title">Instructions:</div>
        <div>{drinkData.instructions}</div>

        <div className="section-title">List of ingredients:</div>
        <ul className="ingredients-list">
          {drinkData.ingredients.map((item, index) => (
            <li key={index}>
              strMeasure{index + 1} strIngredient{index + 1}: {item.measure} {item.ingredient}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
