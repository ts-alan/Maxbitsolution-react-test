import { useAppTranslations } from '../../hooks/useAppTranslations';
import { NotFound } from './NotFound';

export function NotFoundContainer() {
  const translations = useAppTranslations();

  return <NotFound translations={translations.notFound} />;
} 