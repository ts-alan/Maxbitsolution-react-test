import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { store } from '../../store/store';
import { NotFoundPage } from './NotFoundPage';
import theme from '../../theme';

const renderNotFoundPage = () => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe('NotFoundPage', () => {
  it('renders 404 page with all elements', () => {
    renderNotFoundPage();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, we couldn't find the page you're looking for."),
    ).toBeInTheDocument();
    expect(screen.getByText('Go back to Home')).toBeInTheDocument();
  });

}); 