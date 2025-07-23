import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

describe("LoadingSpinner component", () => {
  it("renders with default loading text", () => {
    render(<LoadingSpinner />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders with custom loading text", () => {
    const customText = "Loading cocktails...";
    render(<LoadingSpinner loadingText={customText} />);
    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it("applies correct CSS class", () => {
    render(<LoadingSpinner loadingText="Test loading" />);
    const loadingDiv = screen.getByText("Test loading");
    expect(loadingDiv).toHaveClass("loading-spinner");
  });

  it("renders empty string when provided", () => {
    render(<LoadingSpinner loadingText="" />);
    const loadingDiv = document.querySelector(".loading-spinner");
    expect(loadingDiv).toBeInTheDocument();
    expect(loadingDiv).toHaveTextContent("");
  });
});
