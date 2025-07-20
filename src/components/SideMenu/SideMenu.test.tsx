import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SideMenu } from "./SideMenu";
import MargaritaIcon from "@mui/icons-material/LocalBar";
import MojitoIcon from "@mui/icons-material/LocalDrink";
import A1Icon from "@mui/icons-material/WineBar";
import KirIcon from "@mui/icons-material/Liquor";

const mockMenuItemsData = [
  { text: "Margarita", Icon: MargaritaIcon, path: "/margarita", code: "margarita" },
  { text: "Mojito", Icon: MojitoIcon, path: "/mojito", code: "mojito" },
  { text: "A1", Icon: A1Icon, path: "/a1", code: "a1" },
  { text: "Kir", Icon: KirIcon, path: "/kir", code: "kir" },
];

describe("SideMenu component", () => {
  it("renders all menu items with correct links", () => {
    render(
      <MemoryRouter>
        <SideMenu isOpen={true} currentPath="/margarita" menuItemsData={mockMenuItemsData} />
      </MemoryRouter>,
    );

    mockMenuItemsData.forEach((item) => {
      const linkElement = screen.getByText(item.text).closest("a");
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", item.path);
    });
  });

  it("renders correctly when open", () => {
    render(
      <MemoryRouter>
        <SideMenu isOpen={true} currentPath="/margarita" menuItemsData={mockMenuItemsData} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Margarita")).toBeInTheDocument();
  });

  it("renders correctly when closed", () => {
    render(
      <MemoryRouter>
        <SideMenu isOpen={false} currentPath="/margarita" menuItemsData={mockMenuItemsData} />
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
        <SideMenu isOpen={true} currentPath="/mojito" menuItemsData={mockMenuItemsData} />
      </MemoryRouter>,
    );
    const mojitoButton = screen.getByRole("button", { name: /mojito/i });
    expect(mojitoButton).toHaveClass("Mui-selected");
  });
});
