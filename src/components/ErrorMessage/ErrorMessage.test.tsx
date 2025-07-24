import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage component", () => {
  it("renders default error content", () => {
    render(<ErrorMessage />);

    expect(screen.getByText("⚠️")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("Failed to load data. Please try again later."),
    ).toBeInTheDocument();
  });

  it("renders custom error message when provided", () => {
    render(<ErrorMessage message="Custom error message" />);

    expect(screen.getByText("⚠️")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<ErrorMessage />);

    const container = document.querySelector(".error-message");
    expect(container).toBeInTheDocument();

    const heading = screen.getByText("⚠️");
    expect(heading.tagName).toBe("H1");

    const subheading = screen.getByText("Something went wrong");
    expect(subheading.tagName).toBe("H2");
  });

  it("displays all required elements", () => {
    render(<ErrorMessage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("⚠️");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Something went wrong",
    );
    expect(
      screen.getByText("Failed to load data. Please try again later."),
    ).toBeInTheDocument();
  });
});
