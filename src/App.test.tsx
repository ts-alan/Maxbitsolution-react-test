/// <reference types="@testing-library/jest-dom" />

import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { store } from "./store/store";
import App from "./App";
import { server } from "./__mocks__/server";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

const renderApp = (initialRoute: string) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/:cocktailName" element={<App />} />
          <Route path="*" element={<div>Not Found Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe("App component integration tests", () => {
  it("shows loading state initially", () => {
    renderApp("/margarita");
    expect(screen.getByText("Loading cocktail...")).toBeInTheDocument();
  });

  it("fetches and displays cocktail details on successful load", async () => {
    renderApp("/margarita");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Margarita" }),
      ).toBeInTheDocument();
    });

    expect(screen.getByText("Ordinary Drink")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Margarita" })).toBeInTheDocument();
  });

  it("shows NotFound component when no cocktail is found", async () => {
    renderApp("/nonexistentcocktail");

    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
    });

    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });
});
