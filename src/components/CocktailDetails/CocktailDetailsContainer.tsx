import type { Drink } from "../../store/app/types";
import { CocktailDetails } from "./CocktailDetails";

interface CocktailDetailsContainerProps {
  drink: Drink;
}

export function CocktailDetailsContainer({ drink }: CocktailDetailsContainerProps) {
  return <CocktailDetails drink={drink} />;
} 