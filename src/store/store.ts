import { configureStore } from "@reduxjs/toolkit";
import { cocktailsApi } from "./app/apiSlice";

export const store = configureStore({
  reducer: {
    [cocktailsApi.reducerPath]: cocktailsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cocktailsApi.middleware),
});
