import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";

const renderNotFoundPage = () => {
  return render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );
};

describe("NotFoundPage", () => {
  it("renders the layout with not found content", () => {
    renderNotFoundPage();
    
    // Check that layout is rendered (sidebar should be present)
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Margarita")).toBeInTheDocument(); // in sidebar
    expect(screen.getByText("Mojito")).toBeInTheDocument(); // in sidebar
    expect(screen.getByText("A1")).toBeInTheDocument(); // in sidebar
    expect(screen.getByText("Kir")).toBeInTheDocument(); // in sidebar
  });

  it("renders the NotFoundContainer component", () => {
    renderNotFoundPage();
    
    // Check that NotFoundContainer is rendered with default content
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(screen.getByText("Sorry, we couldn't find the page you're looking for.")).toBeInTheDocument();
  });

  it("applies correct CSS classes through layout", () => {
    renderNotFoundPage();
    
    // Check layout structure
    const appContainer = screen.getByText("Margarita").closest(".app-container");
    const mainContent = screen.getByRole("main");
    const notFoundDiv = screen.getByText("404").parentElement;
    
    expect(appContainer).toHaveClass("app-container");
    expect(mainContent).toHaveClass("main-content");
    expect(notFoundDiv).toHaveClass("not-found");
  });

  it("renders semantic HTML structure correctly", () => {
    renderNotFoundPage();
    
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Page Not Found");
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("includes sidebar navigation functionality", () => {
    renderNotFoundPage();
    
    // Check that all sidebar links are present and functional
    const margaritaLink = screen.getByText("Margarita").closest("a");
    const mojitoLink = screen.getByText("Mojito").closest("a");
    const a1Link = screen.getByText("A1").closest("a");
    const kirLink = screen.getByText("Kir").closest("a");

    expect(margaritaLink).toHaveAttribute("href", "/margarita");
    expect(mojitoLink).toHaveAttribute("href", "/mojito");
    expect(a1Link).toHaveAttribute("href", "/a1");
    expect(kirLink).toHaveAttribute("href", "/kir");
  });
}); 