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
      // Prevent duplicate requests when component unmounts and mounts again
      // If data exists in cache, return it without making a new network request
      refetchOnMountOrArgChange: false,
    }),
  }),
});

export const { useGetCocktailByNameQuery } = cocktailsApi;
