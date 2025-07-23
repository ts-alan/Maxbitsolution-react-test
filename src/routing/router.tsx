import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { CocktailPage, NotFoundPage } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/margarita" replace />,
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