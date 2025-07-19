import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "./components/NotFound.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Navigate to="/margarita" />} />
                  <Route path="/:cocktailName" element={<App />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
      </Provider>
  </StrictMode>,
)
