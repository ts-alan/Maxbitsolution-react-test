import { configureStore } from '@reduxjs/toolkit';
import { cocktailsApi } from './apiSlice';
import { server } from '../../__mocks__/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

const createTestStore = () => {
    return configureStore({
        reducer: {
            [cocktailsApi.reducerPath]: cocktailsApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(cocktailsApi.middleware),
    });
};

describe('cocktailsApi', () => {
    let store: ReturnType<typeof createTestStore>;

    beforeEach(() => {
        store = createTestStore();
    });

    it('should fetch cocktail data successfully', async () => {
        const result = await store.dispatch(
            cocktailsApi.endpoints.getCocktailByName.initiate('margarita')
        );

        expect(result.data).toEqual({
            drinks: [
                {
                    strDrink: 'Margarita',
                    strCategory: 'Ordinary Drink',
                    strAlcoholic: 'Alcoholic',
                    strGlass: 'Cocktail glass',
                    strInstructions: 'Rub the rim of the glass with lime slice...',
                    strDrinkThumb: 'margarita.jpg',
                    strIngredient1: 'Tequila',
                    strMeasure1: '1 1/2 oz',
                },
            ],
        });
    });

    it('should return null for non-existent cocktail', async () => {
        const result = await store.dispatch(
            cocktailsApi.endpoints.getCocktailByName.initiate('nonexistentcocktail')
        );

        expect(result.data).toEqual({ drinks: null });
    });
}); 