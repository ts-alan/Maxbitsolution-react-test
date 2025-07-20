import { CocktailCodeEnum } from "../constants/cocktail-code.enum";
import MargaritaIcon from "@mui/icons-material/LocalBar";
import MojitoIcon from "@mui/icons-material/LocalDrink";
import A1Icon from "@mui/icons-material/WineBar";
import KirIcon from "@mui/icons-material/Liquor";
import type { ComponentType } from "react";

const iconMap: Record<CocktailCodeEnum, ComponentType> = {
  [CocktailCodeEnum.Margarita]: MargaritaIcon,
  [CocktailCodeEnum.Mojito]: MojitoIcon,
  [CocktailCodeEnum.A1]: A1Icon,
  [CocktailCodeEnum.Kir]: KirIcon,
};

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateMenuItems() {
  return Object.values(CocktailCodeEnum).map((code) => ({
    text: capitalizeFirst(code),
    Icon: iconMap[code],
    path: `/${code}`,
    code,
  }));
}

export function getFirstCocktailCode(): string {
  return Object.values(CocktailCodeEnum)[0] as string;
}
