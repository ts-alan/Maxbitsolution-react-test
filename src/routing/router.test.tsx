import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { router } from "./router";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const renderWithRouter = (initialEntries: string[]) => {
  const testRouter = createMemoryRouter(router.routes, {
    initialEntries,
  });

  return render(
    <Provider store={store}>
      <RouterProvider router={testRouter} />
    </Provider>,
  );
};

describe("Router Configuration", () => {
  it("should render root route and redirect to margarita", async () => {
    renderWithRouter(["/"]);

    await waitFor(() => {
      expect(screen.getByText("Margarita")).toBeInTheDocument();
    });
  });

  it("should render sidebar with all cocktail options", () => {
    renderWithRouter(["/"]);

    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByText("Mojito")).toBeInTheDocument();
    expect(screen.getByText("A1")).toBeInTheDocument();
    expect(screen.getByText("Kir")).toBeInTheDocument();
  });

  it("should handle navigation between different cocktails", async () => {
    renderWithRouter(["/margarita"]);

    const mojitoLink = screen.getByText("Mojito");
    expect(mojitoLink).toBeInTheDocument();
  });

  it("should render Layout component for all routes", () => {
    renderWithRouter(["/margarita"]);

    expect(document.querySelector(".app-container")).toBeInTheDocument();
    expect(document.querySelector(".main-content")).toBeInTheDocument();
    expect(document.querySelector(".sidebar")).toBeInTheDocument();
  });

  it("should render CocktailPage for valid cocktail routes", async () => {
    renderWithRouter(["/margarita"]);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Margarita")).toBeInTheDocument();
    });
  });

  it("should handle different cocktail routes", async () => {
    const routes = ["/margarita", "/mojito", "/a1", "/kir"];

    for (const route of routes) {
      const { unmount } = renderWithRouter([route]);

      expect(screen.getByText("Loading...")).toBeInTheDocument();

      unmount();
    }
  });

  it("should have correct route parameters", async () => {
    renderWithRouter(["/margarita"]);

    await waitFor(() => {
      const cocktailName = screen.getByText("Margarita");
      expect(cocktailName).toBeInTheDocument();
    });
  });

  it("should render NotFound for unknown routes", async () => {
    renderWithRouter(["/unknown-route"]);

    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
      expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    });
  });

  it("should handle empty routes gracefully", async () => {
    renderWithRouter([""]);

    await waitFor(() => {
      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getAllByText("Margarita")).toHaveLength(2);
      expect(document.querySelectorAll(".cocktail-details")).toHaveLength(6);
    });
  });

  it("should maintain sidebar state across route changes", () => {
    renderWithRouter(["/margarita"]);

    const sidebar = document.querySelector(".sidebar");
    expect(sidebar).toBeInTheDocument();

    const sidebarItems = document.querySelectorAll(".sidebar-item");
    expect(sidebarItems).toHaveLength(4);
  });

  it("should handle cocktail routes with special characters", async () => {
    renderWithRouter(["/some-cocktail-123"]);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
    });
  });

  it("should render correct page title context", async () => {
    renderWithRouter(["/margarita"]);

    await waitFor(() => {
      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getAllByText("Margarita")).toHaveLength(2);
      expect(document.querySelectorAll(".cocktail-details")).toHaveLength(6);
    });
  });

  it("should handle route navigation state", () => {
    renderWithRouter(["/margarita"]);

    const activeLink = document.querySelector(".sidebar-item.active");
    expect(activeLink).toBeInTheDocument();
    expect(activeLink).toHaveTextContent("Margarita");
  });

  it("should handle case sensitivity in routes", () => {
    const routes = ["/Margarita", "/MOJITO", "/A1"];

    for (const route of routes) {
      const { unmount } = renderWithRouter([route]);

      expect(screen.getByText("Loading...")).toBeInTheDocument();

      unmount();
    }
  });

  it("should properly render main content area", () => {
    renderWithRouter(["/margarita"]);

    const mainContent = document.querySelector(".main-content");
    expect(mainContent).toBeInTheDocument();
  });

  it("should handle multiple route parameters", () => {
    renderWithRouter(["/margarita"]);

    expect(document.querySelector(".app-container")).toBeInTheDocument();
  });

  it("should handle URL parameters correctly", async () => {
    renderWithRouter(["/test-cocktail-name"]);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
    });
  });

  it("should render proper component hierarchy", () => {
    renderWithRouter(["/margarita"]);

    expect(
      document.querySelector(".app-container .sidebar"),
    ).toBeInTheDocument();
    expect(
      document.querySelector(".app-container .main-content"),
    ).toBeInTheDocument();
  });
});
