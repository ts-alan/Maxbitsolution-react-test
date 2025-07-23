import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SideMenu } from "./SideMenu";

const renderSideMenu = (initialRoute = "/margarita") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <SideMenu />
    </MemoryRouter>
  );
};

describe("SideMenu component", () => {
  it("renders all cocktail menu items", () => {
    renderSideMenu();
    
    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByText("Mojito")).toBeInTheDocument();
    expect(screen.getByText("A1")).toBeInTheDocument();
    expect(screen.getByText("Kir")).toBeInTheDocument();
  });

  it("renders menu items as links with correct href", () => {
    renderSideMenu();
    
    const margaritaLink = screen.getByText("Margarita").closest("a");
    const mojitoLink = screen.getByText("Mojito").closest("a");
    const a1Link = screen.getByText("A1").closest("a");
    const kirLink = screen.getByText("Kir").closest("a");

    expect(margaritaLink).toHaveAttribute("href", "/margarita");
    expect(mojitoLink).toHaveAttribute("href", "/mojito");
    expect(a1Link).toHaveAttribute("href", "/a1");
    expect(kirLink).toHaveAttribute("href", "/kir");
  });

  it("highlights the active menu item - margarita", () => {
    renderSideMenu("/margarita");
    
    const margaritaLink = screen.getByText("Margarita").closest("a");
    const mojitoLink = screen.getByText("Mojito").closest("a");
    
    expect(margaritaLink).toHaveClass("active");
    expect(mojitoLink).not.toHaveClass("active");
  });

  it("highlights the active menu item - mojito", () => {
    renderSideMenu("/mojito");
    
    const margaritaLink = screen.getByText("Margarita").closest("a");
    const mojitoLink = screen.getByText("Mojito").closest("a");
    
    expect(mojitoLink).toHaveClass("active");
    expect(margaritaLink).not.toHaveClass("active");
  });

  it("highlights the active menu item - a1", () => {
    renderSideMenu("/a1");
    
    const a1Link = screen.getByText("A1").closest("a");
    const kirLink = screen.getByText("Kir").closest("a");
    
    expect(a1Link).toHaveClass("active");
    expect(kirLink).not.toHaveClass("active");
  });

  it("highlights the active menu item - kir", () => {
    renderSideMenu("/kir");
    
    const kirLink = screen.getByText("Kir").closest("a");
    const a1Link = screen.getByText("A1").closest("a");
    
    expect(kirLink).toHaveClass("active");
    expect(a1Link).not.toHaveClass("active");
  });

  it("applies correct CSS classes", () => {
    renderSideMenu("/margarita");
    
    const nav = screen.getByRole("navigation");
    const margaritaLink = screen.getByText("Margarita").closest("a");
    const mojitoLink = screen.getByText("Mojito").closest("a");
    
    expect(nav).toHaveClass("sidebar");
    expect(margaritaLink).toHaveClass("sidebar-item", "active");
    expect(mojitoLink).toHaveClass("sidebar-item");
    expect(mojitoLink).not.toHaveClass("active");
  });

  it("capitalizes cocktail names correctly", () => {
    renderSideMenu();
    
    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByText("Mojito")).toBeInTheDocument();
    expect(screen.getByText("A1")).toBeInTheDocument(); 
    expect(screen.getByText("Kir")).toBeInTheDocument();
  });
}); 
