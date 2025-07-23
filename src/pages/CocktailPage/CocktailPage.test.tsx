import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { CocktailPage } from "./CocktailPage";
import { cocktailsApi } from "../../store/app/apiSlice";
import { server } from "../../__mocks__/server";

// Create a store for testing
const createTestStore = () =>
  configureStore({
    reducer: {
      [cocktailsApi.reducerPath]: cocktailsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cocktailsApi.middleware),
  });

// Establish API mocking before all tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderCocktailPage = (initialRoute: string) => {
  const store = createTestStore();
  
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/:cocktailName" element={<CocktailPage />} />
          <Route path="*" element={<div>Not Found Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe("CocktailPage", () => {
  it("shows loading state initially", () => {
    renderCocktailPage("/margarita");
    expect(screen.getByText("Loading cocktail...")).toBeInTheDocument();
  });

  it("fetches and displays cocktail details for margarita", async () => {
    renderCocktailPage("/margarita");

    await waitFor(() => {
      expect(screen.getByText("Margarita")).toBeInTheDocument();
    });

    expect(screen.getByText("strCategory: Ordinary Drink")).toBeInTheDocument();
    expect(screen.getByText("strAlcoholic: Alcoholic")).toBeInTheDocument();
    expect(screen.getByText("strGlass: Cocktail glass")).toBeInTheDocument();
    expect(screen.getByText("Rub the rim of the glass with lime slice...")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Margarita" })).toBeInTheDocument();
  });

  it("fetches and displays multiple cocktail variants for mojito", async () => {
    renderCocktailPage("/mojito");

    await waitFor(() => {
      // Check for both cocktail names in the content area (not sidebar)
      const mojitoElements = screen.getAllByText("Mojito");
      expect(mojitoElements.length).toBeGreaterThan(0);
      
      expect(screen.getByText("Virgin Mojito")).toBeInTheDocument();
    });

    // Check that both cocktails are displayed
    expect(screen.getByText(/strCategory:.*Cocktail/)).toBeInTheDocument();
    expect(screen.getByText(/strCategory:.*Non-Alcoholic/)).toBeInTheDocument();
  });

  it("shows NotFound component when cocktail is not found", async () => {
    renderCocktailPage("/nonexistent");

    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
    });
    
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(screen.getByText("Sorry, we couldn't find the page you're looking for.")).toBeInTheDocument();
  });

  it("uses default cocktail name when no param is provided", async () => {
    // Test the fallback to 'margarita' when cocktailName is undefined
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<CocktailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Margarita")).toBeInTheDocument();
    });
  });

  it("renders layout container with sidebar navigation", async () => {
    renderCocktailPage("/margarita");

    // Check that the layout includes the sidebar navigation
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Margarita")).toBeInTheDocument(); // in sidebar
    expect(screen.getByText("Mojito")).toBeInTheDocument(); // in sidebar
    expect(screen.getByText("A1")).toBeInTheDocument(); // in sidebar
    expect(screen.getByText("Kir")).toBeInTheDocument(); // in sidebar

    // Wait for the cocktail content to load
    await waitFor(() => {
      expect(screen.getAllByText("Margarita")).toHaveLength(2); // one in sidebar, one in content
    });
  });

  it("displays ingredients correctly", async () => {
    renderCocktailPage("/margarita");

    await waitFor(() => {
      expect(screen.getByText("List of ingredients:")).toBeInTheDocument();
    });

    expect(screen.getByText("strMeasure1 strIngredient1: 1 1/2 oz Tequila")).toBeInTheDocument();
    expect(screen.getByText("strMeasure2 strIngredient2: 1/2 oz Triple sec")).toBeInTheDocument();
    expect(screen.getByText("strMeasure3 strIngredient3: 1 oz Lime juice")).toBeInTheDocument();
  });

  it("displays image with lazy loading", async () => {
    renderCocktailPage("/margarita");

    await waitFor(() => {
      const image = screen.getByRole("img", { name: "Margarita" });
      expect(image).toBeInTheDocument();
    });

    const image = screen.getByRole("img", { name: "Margarita" });
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("src", "https://www.thecocktaildb.com/images/media/drink/margarita.jpg");
  });

  it("handles different cocktail names correctly", async () => {
    // Test with different route parameters
    const testCases = [
      { route: "/margarita", expectedName: "Margarita" },
      { route: "/mojito", expectedName: "Mojito" },
    ];

    for (const testCase of testCases) {
      const { unmount } = renderCocktailPage(testCase.route);
      
      await waitFor(() => {
        expect(screen.getByText(testCase.expectedName)).toBeInTheDocument();
      });
      
      unmount();
    }
  });
}); 