import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFound } from "./NotFound";

describe("NotFound component", () => {
  it("renders 404 error and a link to the homepage", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    // Check for the "404" heading
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();

    // Check for the "Page Not Found" text
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();

    // Check for the link to the homepage
    const homeLink = screen.getByRole("link", { name: /go back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
