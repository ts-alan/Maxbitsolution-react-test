import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { cocktailsApi } from "../store/app/apiSlice";
import { CocktailPage, NotFoundPage } from "../pages";
import { server } from "../__mocks__/server";


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


const renderWithRouter = (initialEntries: string[]) => {
  const store = createTestStore();
  
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <div data-testid="redirect-test">Redirect page</div>,
      },
      {
        path: "/:cocktailName",
        element: <CocktailPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
    { initialEntries }
  );

  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

describe("Router Configuration", () => {
  it("should render CocktailPage for valid cocktail routes", async () => {
    renderWithRouter(["/margarita"]);
    
    
    expect(screen.getByText("Loading cocktail...")).toBeInTheDocument();
    
    
    await waitFor(() => {
      expect(screen.getByText("Margarita")).toBeInTheDocument();
    });
    
    
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should handle different cocktail routes", async () => {
    const testCases = ["/margarita", "/mojito"];
    
    for (const route of testCases) {
      const { unmount } = renderWithRouter([route]);
      
      
      expect(screen.getByText("Loading cocktail...")).toBeInTheDocument();
      
      unmount();
    }
  });

  it("should render NotFoundPage for invalid routes", async () => {
    renderWithRouter(["/invalid-route"]);

    
    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
    });
    
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    
    
    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByText("Mojito")).toBeInTheDocument();
  });

  it("should handle root path", () => {
    renderWithRouter(["/"]);
    
    
    expect(screen.getByTestId("redirect-test")).toBeInTheDocument();
  });

  it("should handle nested invalid routes", async () => {
    renderWithRouter(["/some/nested/invalid/route"]);
    
    
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("should handle cocktail routes with special characters", async () => {
    renderWithRouter(["/some-cocktail-123"]);
    
    
    expect(screen.getByText("Loading cocktail...")).toBeInTheDocument();
    
    
    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
    });
  });

  it("should maintain navigation state across route changes", async () => {
    renderWithRouter(["/margarita"]);
    
    
    await waitFor(() => {
      expect(screen.getByText("Margarita")).toBeInTheDocument();
    });
    
    
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    const sidebarLinks = screen.getAllByRole("link");
    expect(sidebarLinks.length).toBeGreaterThan(0);
    
    
    expect(screen.getByText("Mojito")).toBeInTheDocument(); 
    expect(screen.getByText("A1")).toBeInTheDocument(); 
    expect(screen.getByText("Kir")).toBeInTheDocument(); 
  });

  it("should handle case sensitivity in routes", async () => {
    const testCases = ["/MARGARITA", "/Margarita", "/margarita"];
    
    for (const route of testCases) {
      const { unmount } = renderWithRouter([route]);
      
      
      expect(screen.getByText("Loading cocktail...")).toBeInTheDocument();
      
      unmount();
    }
  });

  it("should render layout structure for all routes", async () => {
    const routes = ["/margarita", "/nonexistent", "/invalid-route"];
    
    for (const route of routes) {
      const { unmount } = renderWithRouter([route]);
      
      
      const navigation = screen.getByRole("navigation");
      const main = screen.getByRole("main");
      
      expect(navigation).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      
      
      expect(navigation).toHaveClass("sidebar");
      expect(main).toHaveClass("main-content");
      
      unmount();
    }
  });

  it("should handle URL parameters correctly", async () => {
    renderWithRouter(["/test-cocktail-name"]);
    
    
    expect(screen.getByText("Loading cocktail...")).toBeInTheDocument();
    
    
    
    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
    });
  });
}); 
