import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

describe("LoadingSpinner component", () => {
  it("renders loading spinner", () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("has correct CSS class", () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByText("Loading...");
    expect(spinner).toHaveClass("loading-spinner");
  });

  it("displays default loading text", () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
