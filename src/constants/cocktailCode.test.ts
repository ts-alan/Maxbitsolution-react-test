import { CocktailCodeEnum } from "./cocktailCode";

describe("CocktailCodeEnum", () => {
  it("should have correct cocktail codes", () => {
    expect(CocktailCodeEnum.Margarita).toBe("margarita");
    expect(CocktailCodeEnum.Mojito).toBe("mojito");
    expect(CocktailCodeEnum.A1).toBe("a1");
    expect(CocktailCodeEnum.Kir).toBe("kir");
  });

  it("should contain all expected cocktail types", () => {
    const expectedCocktails = ["margarita", "mojito", "a1", "kir"];
    const actualCocktails = Object.values(CocktailCodeEnum);

    expect(actualCocktails).toEqual(expect.arrayContaining(expectedCocktails));
    expect(actualCocktails).toHaveLength(4);
  });
}); 