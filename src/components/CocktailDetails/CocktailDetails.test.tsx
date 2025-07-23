import { render, screen } from "@testing-library/react";
import { CocktailDetails } from "./CocktailDetails";
import type { Drink } from "../../store/app/types";

const mockDrink: Drink = {
  idDrink: "11007",
  strDrink: "Margarita",
  strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/margarita.jpg",
  strCategory: "Ordinary Drink",
  strAlcoholic: "Alcoholic",
  strGlass: "Cocktail glass",
  strInstructions: "Rub the rim of the glass with lime slice...",
  strIngredient1: "Tequila",
  strIngredient2: "Triple sec",
  strIngredient3: "Lime juice",
  strMeasure1: "1 1/2 oz ",
  strMeasure2: "1/2 oz ",
  strMeasure3: "1 oz ",
};

const mockDrinkWithoutImage: Drink = {
  ...mockDrink,
  strDrinkThumb: null,
};

describe("CocktailDetails component", () => {
  it("renders cocktail name", () => {
    render(<CocktailDetails drink={mockDrink} />);
    
    expect(screen.getByText("Margarita")).toBeInTheDocument();
  });

  it("renders all cocktail metadata with correct labels", () => {
    render(<CocktailDetails drink={mockDrink} />);
    
    expect(screen.getByText("Category:")).toBeInTheDocument();
    expect(screen.getByText("Ordinary Drink")).toBeInTheDocument();
    expect(screen.getByText("Type:")).toBeInTheDocument();
    expect(screen.getByText("Alcoholic")).toBeInTheDocument();
    expect(screen.getByText("Glass:")).toBeInTheDocument();
    expect(screen.getByText("Cocktail glass")).toBeInTheDocument();
  });

  it("renders instructions", () => {
    render(<CocktailDetails drink={mockDrink} />);
    
    expect(screen.getByText("Instructions:")).toBeInTheDocument();
    expect(screen.getByText("Rub the rim of the glass with lime slice...")).toBeInTheDocument();
  });

  it("renders ingredients list", () => {
    render(<CocktailDetails drink={mockDrink} />);

    expect(screen.getByText("List of ingredients:")).toBeInTheDocument();
    expect(screen.getByText("1 1/2 oz Tequila")).toBeInTheDocument();
    expect(screen.getByText("1/2 oz Triple sec")).toBeInTheDocument();
    expect(screen.getByText("1 oz Lime juice")).toBeInTheDocument();
  });

  it("renders image with correct attributes", () => {
    render(<CocktailDetails drink={mockDrink} />);
    
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://www.thecocktaildb.com/images/media/drink/margarita.jpg");
    expect(image).toHaveAttribute("alt", "Margarita");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("renders placeholder when no image is provided", () => {
    render(<CocktailDetails drink={mockDrinkWithoutImage} />);
    
    expect(screen.getByText("Image not available")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders 'Not available' for missing data", () => {
    const incompleteData: Drink = {
      idDrink: "1",
      strDrink: null,
      strCategory: null,
      strAlcoholic: null,
      strGlass: null,
      strInstructions: null,
      strDrinkThumb: null,
    };

    render(<CocktailDetails drink={incompleteData} />);
    
    expect(screen.getAllByText("Not available")).toHaveLength(6); // name, category, type, glass, instructions, ingredients
  });

  it("renders ingredients without measure when measure is missing", () => {
    const drinkWithoutMeasures: Drink = {
      ...mockDrink,
      strIngredient1: "Salt",
      strMeasure1: undefined,
    };

    render(<CocktailDetails drink={drinkWithoutMeasures} />);
    
    expect(screen.getByText("Salt")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<CocktailDetails drink={mockDrink} />);
    
    expect(document.querySelector(".cocktail-details")).toBeInTheDocument();
    expect(document.querySelector(".cocktail-image")).toBeInTheDocument();
    expect(document.querySelector(".cocktail-info")).toBeInTheDocument();
    expect(document.querySelector(".cocktail-name")).toBeInTheDocument();
    expect(document.querySelector(".cocktail-meta")).toBeInTheDocument();
    expect(document.querySelector(".ingredients-list")).toBeInTheDocument();
  });
}); 
