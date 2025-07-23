import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";

const renderNotFoundPage = () => {
  return render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>,
  );
};

describe("NotFoundPage", () => {
  it("renders the layout with not found content", () => {
    renderNotFoundPage();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByText("Mojito")).toBeInTheDocument();
    expect(screen.getByText("A1")).toBeInTheDocument();
    expect(screen.getByText("Kir")).toBeInTheDocument();
  });

  it("renders the NotFoundContainer component", () => {
    renderNotFoundPage();

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("The page you are looking for does not exist."),
    ).toBeInTheDocument();
  });

  it("applies correct CSS classes through layout", () => {
    renderNotFoundPage();

    const appContainer = screen
      .getByText("Margarita")
      .closest(".app-container");
    const mainContent = screen.getByRole("main");
    const notFoundDiv = screen.getByText("404").parentElement;

    expect(appContainer).toHaveClass("app-container");
    expect(mainContent).toHaveClass("main-content");
    expect(notFoundDiv).toHaveClass("not-found");
  });

  it("renders semantic HTML structure correctly", () => {
    renderNotFoundPage();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Page Not Found",
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("includes sidebar navigation functionality", () => {
    renderNotFoundPage();

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
