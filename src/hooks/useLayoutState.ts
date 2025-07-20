import { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getMenuItemsData } from '../components/SideMenu/constants';

export function useLayoutState() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(!isMobile);
  const { t } = useTranslation();
  const menuItemsData = getMenuItemsData(t);

  const handleDrawerToggle = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return {
    isMobile,
    isSideMenuOpen,
    menuItemsData,
    handleDrawerToggle,
  };
} 