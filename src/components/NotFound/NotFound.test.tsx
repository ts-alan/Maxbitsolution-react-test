import { render, screen } from "@testing-library/react";
import { NotFound } from "./NotFound";

describe("NotFound component", () => {
  it("renders with default props", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, we couldn't find the page you're looking for."),
    ).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    const customProps = {
      title: "500",
      subtitle: "Server Error",
      description: "Something went wrong on our end.",
    };

    render(<NotFound {...customProps} />);

    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("Server Error")).toBeInTheDocument();
    expect(
      screen.getByText("Something went wrong on our end."),
    ).toBeInTheDocument();
  });

  it("applies correct CSS class", () => {
    render(<NotFound />);

    const notFoundDiv = screen.getByText("404").parentElement;
    expect(notFoundDiv).toHaveClass("not-found");
  });

  it("renders correct HTML elements", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Page Not Found",
    );

    const paragraph = screen.getByText(
      "Sorry, we couldn't find the page you're looking for.",
    );
    expect(paragraph.tagName).toBe("P");
  });

  it("handles empty strings gracefully", () => {
    render(<NotFound title="" subtitle="" description="" />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });
    const p = document.querySelector("p");

    expect(h1).toHaveTextContent("");
    expect(h2).toHaveTextContent("");
    expect(p).toHaveTextContent("");
  });
});
