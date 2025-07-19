import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { NotFound } from "./components/NotFound.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/margarita" />,
  },
  {
    path: "/:cocktailName",
    element: <App />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
          </ThemeProvider>
      </Provider>
  </StrictMode>,
)
