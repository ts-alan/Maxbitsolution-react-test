import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SideMenu } from "./SideMenu";

const menuItems = ["Margarita", "Mojito", "A1", "Kir"];

describe("SideMenu component", () => {
  it("renders all menu items with correct links", () => {
    render(
      <MemoryRouter>
        <SideMenu isOpen={true} />
      </MemoryRouter>,
    );

    menuItems.forEach((item) => {
      const linkElement = screen.getByText(item).closest("a");
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", `/${item.toLowerCase()}`);
    });
  });

  it("renders correctly when open", () => {
    render(
      <MemoryRouter>
        <SideMenu isOpen={true} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Margarita")).toBeInTheDocument();
  });

  it("renders correctly when closed", () => {
    render(
      <MemoryRouter>
        <SideMenu isOpen={false} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Margarita")).toBeInTheDocument();
    // Check for styles indicating it's closed, e.g., opacity of text is 0
    const listItemText = screen.getByText("Margarita").parentElement;
    expect(listItemText).toHaveStyle("opacity: 0");
  });

  it("highlights the active link", () => {
    render(
      <MemoryRouter initialEntries={["/mojito"]}>
        <SideMenu isOpen={true} />
      </MemoryRouter>,
    );
    const mojitoButton = screen.getByRole("button", { name: /mojito/i });
    expect(mojitoButton).toHaveClass("Mui-selected");
  });
});
