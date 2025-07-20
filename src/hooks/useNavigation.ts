import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMenuItemsData } from '../components/SideMenu/constants';

export function useNavigation() {
  const location = useLocation();
  const { t } = useTranslation();
  const menuItemsData = getMenuItemsData(t);

  return {
    currentPath: location.pathname,
    menuItemsData,
  };
} 