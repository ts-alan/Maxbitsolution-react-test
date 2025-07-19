import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from "@mui/material";
import { store } from './store/store';
import App from './App';
import { NotFound } from './components/NotFound';
import theme from './theme';
import { server } from './__mocks__/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createTestRouter = (initialEntries: string[]) => {
    return createMemoryRouter([
        {
            path: "/",
            element: <div>Home redirect</div>,
        },
        {
            path: "/:cocktailName",
            element: <App />,
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ], {
        initialEntries,
    });
};

const renderWithRouter = (router: ReturnType<typeof createTestRouter>) => {
    return render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    );
};

describe('Routing integration tests', () => {
    it('should navigate to margarita cocktail page', async () => {
        const router = createTestRouter(['/margarita']);
        renderWithRouter(router);

        await waitFor(() => {
            expect(screen.getByText('Margarita')).toBeInTheDocument();
        });
    });

    it('should show 404 page for unknown routes', async () => {
        const router = createTestRouter(['/unknown-route']);
        renderWithRouter(router);

        await waitFor(() => {
            expect(screen.getByText('404')).toBeInTheDocument();
        });
        expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    });

    it('should handle cocktail names with different cases', async () => {
        const router = createTestRouter(['/MARGARITA']);
        renderWithRouter(router);

        // Should load and show results for "margarita"
        await waitFor(() => {
            expect(screen.getByText('Loading cocktail...')).toBeInTheDocument();
        });
    });
}); 