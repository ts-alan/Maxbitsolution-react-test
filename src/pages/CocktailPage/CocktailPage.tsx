import { useParams } from "react-router-dom";
import { useGetCocktailByNameQuery } from "../../store/app/apiSlice";
import { CocktailDetails } from "../../components/CocktailDetails";
import { NotFound } from "../../components/NotFound";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Layout } from "../../components/Layout";

export function CocktailPage() {
  const { cocktailName } = useParams<{ cocktailName: string }>();
  const { data, isFetching } = useGetCocktailByNameQuery(
    cocktailName || "margarita",
  );

  const drinks = data?.drinks ?? [];

  return (
    <Layout>
      {isFetching ? (
        <LoadingSpinner loadingText="Loading cocktail..." />
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
