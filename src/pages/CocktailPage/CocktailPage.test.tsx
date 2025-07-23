import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { store } from '../../store/store';
import { CocktailPage } from './CocktailPage';
import theme from '../../theme';
import { server } from '../../__mocks__/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

const renderCocktailPage = (initialRoute: string) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/:cocktailName" element={<CocktailPage />} />
            <Route path="*" element={<div>Not Found Page</div>} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe('CocktailPage', () => {
  it('shows loading state initially', () => {
    renderCocktailPage('/margarita');
    expect(screen.getByText('Loading cocktail...')).toBeInTheDocument();
  });

  it('fetches and displays cocktail details on successful load', async () => {
    renderCocktailPage('/margarita');

    await waitFor(() => {
      const headings = screen.getAllByRole('heading', { name: 'Margarita' });
      expect(headings.length).toBeGreaterThan(0);
    });

    expect(screen.getByText('Category: Ordinary Drink')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Margarita' })).toBeInTheDocument();
  });

  it('shows NotFound component when no cocktail is found', async () => {
    renderCocktailPage('/nonexistentcocktail');

    await waitFor(() => {
      expect(screen.getByText('404')).toBeInTheDocument();
    });
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
}); 