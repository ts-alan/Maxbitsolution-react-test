import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders loading spinner with text", () => {
    render(<LoadingSpinner loadingText="Loading cocktail..." />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText("Loading cocktail...")).toBeInTheDocument();
  });
});
