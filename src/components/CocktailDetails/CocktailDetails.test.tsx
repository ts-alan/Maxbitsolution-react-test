import { render, screen } from "@testing-library/react";
import { CocktailDetails } from "./CocktailDetails";
import type { Drink } from "../../store/app/types";

const mockDrink: Drink = {
  idDrink: "11007",
  strDrink: "Margarita",
  strCategory: "Ordinary Drink",
  strAlcoholic: "Alcoholic",
  strGlass: "Cocktail glass",
  strInstructions: "Rub the rim of the glass with lime slice...",
  strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/margarita.jpg",
  strIngredient1: "Tequila",
  strMeasure1: "1 1/2 oz",
  strIngredient2: "Triple sec",
  strMeasure2: "1/2 oz",
  strIngredient3: "Lime juice",
  strMeasure3: "1 oz",
};

const mockDrinkWithoutImage: Drink = {
  ...mockDrink,
  strDrinkThumb: "",
};

describe("CocktailDetails component", () => {
  it("renders cocktail name correctly", () => {
    render(<CocktailDetails drink={mockDrink} />);
    expect(screen.getByText("Margarita")).toBeInTheDocument();
  });

  it("renders all cocktail metadata", () => {
    render(<CocktailDetails drink={mockDrink} />);
    
    expect(screen.getByText("strCategory: Ordinary Drink")).toBeInTheDocument();
    expect(screen.getByText("strAlcoholic: Alcoholic")).toBeInTheDocument();
    expect(screen.getByText("strGlass: Cocktail glass")).toBeInTheDocument();
  });

  it("renders instructions section", () => {
    render(<CocktailDetails drink={mockDrink} />);
    
    expect(screen.getByText("Instructions:")).toBeInTheDocument();
    expect(screen.getByText("Rub the rim of the glass with lime slice...")).toBeInTheDocument();
  });

  it("renders ingredients list", () => {
    render(<CocktailDetails drink={mockDrink} />);
    
    expect(screen.getByText("List of ingredients:")).toBeInTheDocument();
    expect(screen.getByText("strMeasure1 strIngredient1: 1 1/2 oz Tequila")).toBeInTheDocument();
    expect(screen.getByText("strMeasure2 strIngredient2: 1/2 oz Triple sec")).toBeInTheDocument();
    expect(screen.getByText("strMeasure3 strIngredient3: 1 oz Lime juice")).toBeInTheDocument();
  });

  it("renders image when strDrinkThumb is provided", () => {
    render(<CocktailDetails drink={mockDrink} />);
    
    const image = screen.getByRole("img", { name: "Margarita" });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockDrink.strDrinkThumb);
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("renders placeholder when no image is provided", () => {
    render(<CocktailDetails drink={mockDrinkWithoutImage} />);
    
    expect(screen.getByText("strDrinkThumb")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("handles empty ingredients gracefully", () => {
    const drinkWithEmptyIngredients: Drink = {
      idDrink: "1",
      strDrink: "Margarita",
      strCategory: "Ordinary Drink",
      strAlcoholic: "Alcoholic",
      strGlass: "Cocktail glass",
      strInstructions: "Rub the rim of the glass with lime slice...",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/margarita.jpg",
      strIngredient1: "",
      strIngredient2: "",
      strIngredient3: "Lime juice",
      strMeasure1: "",
      strMeasure2: "",
      strMeasure3: "1 oz",
    };

    render(<CocktailDetails drink={drinkWithEmptyIngredients} />);
    
    expect(screen.getByText("List of ingredients:")).toBeInTheDocument();
    // Should only render the lime juice ingredient (strIngredient3)
    expect(screen.getByText(/1 oz.*Lime juice/)).toBeInTheDocument();
    // Should not render empty ingredients - check there's only one ingredient listed
    const ingredientItems = screen.getAllByRole('listitem');
    expect(ingredientItems).toHaveLength(1);
  });

  it("handles ingredients without measures", () => {
    const drinkWithoutMeasures: Drink = {
      idDrink: "1",
      strDrink: "Margarita",
      strCategory: "Ordinary Drink", 
      strAlcoholic: "Alcoholic",
      strGlass: "Cocktail glass",
      strInstructions: "Rub the rim of the glass with lime slice...",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/margarita.jpg",
      strIngredient1: "Tequila",
      strIngredient2: "Triple sec", 
      strIngredient3: "Lime juice",
      strMeasure1: "",
      strMeasure2: "",
      strMeasure3: "1 oz",
    };

    render(<CocktailDetails drink={drinkWithoutMeasures} />);
    
    expect(screen.getByText(/.*Tequila/)).toBeInTheDocument();
    expect(screen.getByText(/.*Triple sec/)).toBeInTheDocument();
    expect(screen.getByText(/1 oz.*Lime juice/)).toBeInTheDocument();
  });
}); 