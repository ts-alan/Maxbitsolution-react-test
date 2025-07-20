import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { store } from '../../store/store';
import { Layout } from './Layout';
import theme from '../../theme';

const renderLayout = (children: React.ReactNode = <div>Test Content</div>) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Layout>{children}</Layout>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );
};

describe('Layout component', () => {
  it('renders children content', () => {
    renderLayout(<div>Custom Test Content</div>);
    expect(screen.getByText('Custom Test Content')).toBeInTheDocument();
  });

  it('renders navigation elements', () => {
    renderLayout();

    expect(screen.getByLabelText('open drawer')).toBeInTheDocument();
    expect(screen.getByLabelText('Switch Language')).toBeInTheDocument();
  });

  it('renders side menu with cocktail items', () => {
    renderLayout();

    expect(screen.getByText('Margarita')).toBeInTheDocument();
    expect(screen.getByText('Mojito')).toBeInTheDocument();
    expect(screen.getByText('A1')).toBeInTheDocument();
    expect(screen.getByText('Kir')).toBeInTheDocument();
  });

  it('renders menu toggle button', () => {
    renderLayout();

    const menuButton = screen.getByLabelText('open drawer');
    expect(menuButton).toBeInTheDocument();
    
    // Button should be clickable
    fireEvent.click(menuButton);
    
    // Button should still be in the document after click
    expect(menuButton).toBeInTheDocument();
  });
}); 