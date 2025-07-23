import { render, screen } from "@testing-library/react";
import { NotFound } from "./NotFound";

describe("NotFound component", () => {
  it("renders default 404 content", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("The page you are looking for does not exist."),
    ).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<NotFound />);

    const container = document.querySelector(".not-found");
    expect(container).toBeInTheDocument();

    const heading = screen.getByText("404");
    expect(heading.tagName).toBe("H1");

    const subheading = screen.getByText("Page Not Found");
    expect(subheading.tagName).toBe("H2");
  });

  it("displays all required elements", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Page Not Found",
    );
    expect(
      screen.getByText("The page you are looking for does not exist."),
    ).toBeInTheDocument();
  });
});
