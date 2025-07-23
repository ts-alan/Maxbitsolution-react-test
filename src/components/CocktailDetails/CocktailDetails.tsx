import type { Drink } from "../../store/app/types";
import { formatDrinkData } from "../../utils/drinkTransformers";
import "./CocktailDetails.scss";

interface CocktailDetailsProps {
  drink: Drink;
}

export function CocktailDetails({ drink }: CocktailDetailsProps) {
  const drinkData = formatDrinkData(drink);
  const NotAvailable = "Not available";

  return (
    <div className="cocktail-details">
      <div className="cocktail-image">
        {drinkData.image ? (
          <img
            src={drinkData.image}
            alt={drinkData.name || "Cocktail"}
            loading="lazy"
          />
        ) : (
          <div className="no-image">Image not available</div>
        )}
      </div>

      <div className="cocktail-info">
        <div className="cocktail-name">{drinkData.name || NotAvailable}</div>

        <div className="cocktail-meta">
          <div>
            {drinkData.category || NotAvailable}
          </div>
          <div>
            {drinkData.type || NotAvailable}
          </div>
          <div>
            {drinkData.glass || NotAvailable}
          </div>
        </div>

        <div className="section-title">Instructions:</div>
        <div>{drinkData.instructions || NotAvailable}</div>

        <div className="section-title">List of ingredients:</div>
        {drinkData.ingredients.length > 0 ? (
          <ul className="ingredients-list">
            {drinkData.ingredients.map((item, index) => (
              <li key={index}>
                {[item.measure, item.ingredient].filter(Boolean).join(" ")}
              </li>
            ))}
          </ul>
        ) : (
          <div>{NotAvailable}</div>
        )}
      </div>
    </div>
  );
}
