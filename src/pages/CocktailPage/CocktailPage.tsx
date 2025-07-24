import { useParams } from "react-router-dom";
import { useGetCocktailByNameQuery } from "../../store/app/apiSlice";
import { CocktailDetails } from "../../components/CocktailDetails";
import { NotFound } from "../../components/NotFound";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Layout } from "../../components/Layout";

export function CocktailPage() {
  const { cocktailName } = useParams<{ cocktailName: string }>();
  const { data, error, isLoading } = useGetCocktailByNameQuery(
    cocktailName || "margarita",
  );

  const drinks = data?.drinks ?? [];

  return (
    <Layout>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message="Failed to load cocktail data. Please check your connection and try again." />
      ) : drinks.length > 0 ? (
        <>
          {drinks.map((drink) => (
            <CocktailDetails key={drink.idDrink} drink={drink} />
          ))}
        </>
      ) : (
        <NotFound />
      )}
    </Layout>
  );
}
