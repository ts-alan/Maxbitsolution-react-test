import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CocktailsResponse } from "./types";

export const cocktailsApi = createApi({
    reducerPath: 'cocktailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.thecocktaildb.com/api/json/v1/1/' }),
    endpoints: (builder) => ({
        getCocktailByName: builder.query<CocktailsResponse, string>({
            query: (name) => `search.php?s=${name}`,
        }),
    }),
});

export const { useGetCocktailByNameQuery } = cocktailsApi;