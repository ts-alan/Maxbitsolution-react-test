import { generateMenuItems } from "../../utils/cocktail.utils";

export const getMenuItemsData = (t: (key: string) => string) => generateMenuItems(t);
