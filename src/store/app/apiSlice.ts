import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CocktailsResponse } from "./types";
import config from "../../config";

export const cocktailsApi = createApi({
  reducerPath: "cocktailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.api.baseUrl,
  }),
  endpoints: (builder) => ({
    getCocktailByName: builder.query<CocktailsResponse, string>({
      query: (name) => `search.php?s=${name}`,
      // Keep unused data in the cache for 1 hour (3600 seconds)
      extraOptions: { keepUnusedDataFor: 3600 },
    }),
  }),
});

export const { useGetCocktailByNameQuery } = cocktailsApi;
