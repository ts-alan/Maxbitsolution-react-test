import type { Drink } from "../../store/app/types";
import { useAppTranslations } from "../../hooks/useAppTranslations";
import { CocktailDetails } from "./CocktailDetails";

interface CocktailDetailsContainerProps {
  drink: Drink;
}

export function CocktailDetailsContainer({ drink }: CocktailDetailsContainerProps) {
  const translations = useAppTranslations();

  return (
    <CocktailDetails 
      drink={drink} 
      translations={translations.cocktail} 
    />
  );
} 