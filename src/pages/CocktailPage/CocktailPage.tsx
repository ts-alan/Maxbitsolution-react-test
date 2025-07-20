import { useParams } from 'react-router-dom';
import { useGetCocktailByNameQuery } from '../../store/app/apiSlice';
import { CocktailDetails } from '../../components/CocktailDetails';
import { NotFound } from '../../components/NotFound';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Layout } from '../../components/Layout';

export function CocktailPage() {
  const { cocktailName } = useParams<{ cocktailName: string }>();
  const { data, isFetching } = useGetCocktailByNameQuery(
    cocktailName || 'margarita',
  );

  const drink = data?.drinks?.[0];

  return (
    <Layout>
      {isFetching ? (
        <LoadingSpinner />
      ) : drink ? (
        <CocktailDetails drink={drink} />
      ) : (
        <NotFound />
      )}
    </Layout>
  );
} 