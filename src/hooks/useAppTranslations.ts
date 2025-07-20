import { useTranslation } from 'react-i18next';

export function useAppTranslations() {
  const { t } = useTranslation();
  
  return {
    cocktail: {
      loading: t('cocktails.loading'),
      category: t('cocktails.category'),
      type: t('cocktails.type'),
      glass: t('cocktails.glass'),
      instructions: t('cocktails.instructions'),
      ingredients: t('cocktails.ingredients'),
    },
    notFound: {
      title: t('notFound.title'),
      subtitle: t('notFound.subtitle'),
      description: t('notFound.description'),
      goHome: t('notFound.goHome'),
    },
  };
} 