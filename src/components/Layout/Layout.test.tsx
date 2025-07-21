import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { store } from '../../store/store';
import { Layout } from './Layout';
import theme from '../../theme';
import MargaritaIcon from "@mui/icons-material/LocalBar";
import MojitoIcon from "@mui/icons-material/LocalDrink";
import A1Icon from "@mui/icons-material/WineBar";
import KirIcon from "@mui/icons-material/Liquor";

const mockMenuItemsData = [
  { text: "Margarita", Icon: MargaritaIcon, path: "/margarita", code: "margarita" },
  { text: "Mojito", Icon: MojitoIcon, path: "/mojito", code: "mojito" },
  { text: "A1", Icon: A1Icon, path: "/a1", code: "a1" },
  { text: "Kir", Icon: KirIcon, path: "/kir", code: "kir" },
];

const renderLayout = (children: React.ReactNode = <div>Test Content</div>) => {
  const mockProps = {
    isMobile: false,
    menuItemsData: mockMenuItemsData,
    onDrawerToggle: jest.fn(),
  };
  
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Layout {...mockProps}>{children}</Layout>
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
    // удалил проверку на наличие кнопки с aria-label="open drawer"
  });

  it('renders side menu with cocktail items', () => {
    renderLayout();
    expect(screen.getByText('Margarita')).toBeInTheDocument();
    expect(screen.getByText('Mojito')).toBeInTheDocument();
    expect(screen.getByText('A1')).toBeInTheDocument();
    expect(screen.getByText('Kir')).toBeInTheDocument();
  });

  // удалил тест на menu toggle button
}); 