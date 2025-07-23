import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "./Layout";

const renderLayout = (children: React.ReactNode = <div>Test Content</div>) => {
  return render(
    <MemoryRouter>
      <Layout>{children}</Layout>
    </MemoryRouter>
  );
};

describe("Layout component", () => {
  it("renders children content", () => {
    renderLayout(<div data-testid="test-content">Test Children</div>);
    
    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });

  it("renders SideMenu component", () => {
    renderLayout();
    
    // Check if sidebar navigation is present
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    
    // Check if all menu items are present
    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByText("Mojito")).toBeInTheDocument();
    expect(screen.getByText("A1")).toBeInTheDocument();
    expect(screen.getByText("Kir")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    renderLayout(<div data-testid="test-content">Content</div>);
    
    const appContainer = screen.getByText("Margarita").closest(".app-container");
    const mainContent = screen.getByRole("main");
    
    expect(appContainer).toHaveClass("app-container");
    expect(mainContent).toHaveClass("main-content");
  });

  it("renders main element with correct semantic structure", () => {
    renderLayout(<div data-testid="content">Main Content</div>);
    
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toContainElement(screen.getByTestId("content"));
  });

  it("handles different types of children", () => {
    const complexChildren = (
      <div>
        <h1>Title</h1>
        <p>Paragraph</p>
        <button>Button</button>
      </div>
    );
    
    renderLayout(complexChildren);
    
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
    expect(screen.getByText("Button")).toBeInTheDocument();
  });
}); 