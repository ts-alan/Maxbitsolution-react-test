import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { CocktailPage } from "./CocktailPage";
import { cocktailsApi } from "../../store/app/apiSlice";
import { server } from "../../__mocks__/server";

const createTestStore = () =>
  configureStore({
    reducer: {
      [cocktailsApi.reducerPath]: cocktailsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cocktailsApi.middleware),
  });

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
    </Provider>,
  );
};

describe("CocktailPage", () => {
  it("shows loading state initially", () => {
    renderCocktailPage("/margarita");
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("fetches and displays cocktail details for margarita", async () => {
    renderCocktailPage("/margarita");

    await waitFor(() => {
      expect(screen.getByText("Margarita")).toBeInTheDocument();
    });

    expect(screen.getByText("Ordinary Drink")).toBeInTheDocument();
    expect(screen.getByText("Alcoholic")).toBeInTheDocument();
    expect(screen.getByText("Cocktail glass")).toBeInTheDocument();
    expect(
      screen.getByText("Rub the rim of the glass with lime slice..."),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Margarita" })).toBeInTheDocument();
  });

  it("fetches and displays multiple cocktail variants for mojito", async () => {
    renderCocktailPage("/mojito");

    await waitFor(() => {
      const mojitoElements = screen.getAllByText("Mojito");
      expect(mojitoElements.length).toBeGreaterThan(0);

      expect(screen.getByText("Virgin Mojito")).toBeInTheDocument();
    });

    expect(screen.getByText("Cocktail")).toBeInTheDocument();
    expect(screen.getByText("Non-Alcoholic")).toBeInTheDocument();
  });

  it("shows NotFound component when cocktail is not found", async () => {
    renderCocktailPage("/nonexistent");

    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
    });

    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("The page you are looking for does not exist."),
    ).toBeInTheDocument();
  });

  it("uses default cocktail name when no param is provided", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<CocktailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Margarita")).toBeInTheDocument();
    });
  });

  it("renders layout container with sidebar navigation", async () => {
    renderCocktailPage("/margarita");

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByText("Mojito")).toBeInTheDocument();
    expect(screen.getByText("A1")).toBeInTheDocument();
    expect(screen.getByText("Kir")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText("Margarita")).toHaveLength(2);
    });
  });

  it("displays ingredients correctly", async () => {
    renderCocktailPage("/margarita");

    await waitFor(() => {
      expect(screen.getByText("List of ingredients:")).toBeInTheDocument();
    });

    expect(screen.getByText("1 1/2 oz Tequila")).toBeInTheDocument();
    expect(screen.getByText("1/2 oz Triple sec")).toBeInTheDocument();
    expect(screen.getByText("1 oz Lime juice")).toBeInTheDocument();
  });

  it("displays image with lazy loading", async () => {
    renderCocktailPage("/margarita");

    await waitFor(() => {
      const image = screen.getByRole("img", { name: "Margarita" });
      expect(image).toBeInTheDocument();
    });

    const image = screen.getByRole("img", { name: "Margarita" });
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute(
      "src",
      "https://www.thecocktaildb.com/images/media/drink/margarita.jpg",
    );
  });

  it("handles different cocktail names correctly", async () => {
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
