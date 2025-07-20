import { useAppTranslations } from '../../hooks/useAppTranslations';
import { LoadingSpinner } from './LoadingSpinner';

export function LoadingSpinnerContainer() {
  const translations = useAppTranslations();

  return <LoadingSpinner loadingText={translations.cocktail.loading} />;
} 