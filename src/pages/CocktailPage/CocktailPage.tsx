import { useParams } from 'react-router-dom';
import { useGetCocktailByNameQuery } from '../../store/app/apiSlice';
import { CocktailDetailsContainer } from '../../components/CocktailDetails';
import { NotFoundContainer } from '../../components/NotFound';
import { LoadingSpinnerContainer } from '../../components/LoadingSpinner';
import { LayoutContainer } from '../../components/Layout';

export function CocktailPage() {
  const { cocktailName } = useParams<{ cocktailName: string }>();
  const { data, isFetching } = useGetCocktailByNameQuery(
    cocktailName || 'margarita',
  );

  const drinks = data?.drinks ?? [];

  return (
    <LayoutContainer>
      {isFetching ? (
        <LoadingSpinnerContainer />
      ) : drinks.length > 0 ? (
        <>
          {drinks.map((drink) => (
            <CocktailDetailsContainer key={drink.idDrink} drink={drink} />
          ))}
        </>
      ) : (
        <NotFoundContainer />
      )}
    </LayoutContainer>
  );
} 