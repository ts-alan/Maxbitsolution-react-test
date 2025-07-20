import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import { getFirstCocktailCode } from "./utils/cocktail.utils.ts";
import { CocktailPage, NotFoundPage } from "./pages";
import "./i18n";

const router = createBrowserRouter([
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
