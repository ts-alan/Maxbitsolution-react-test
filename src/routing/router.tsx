import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { getFirstCocktailCode } from "../utils/cocktail.utils";
import { CocktailPage, NotFoundPage } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={`/${getFirstCocktailCode()}`} />,
  },
  {
    path: "/:cocktailName",
    element: <CocktailPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]); 