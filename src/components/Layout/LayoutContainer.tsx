import { type ReactNode } from 'react';
import { useLayoutState } from '../../hooks/useLayoutState';
import { Layout } from './Layout';

interface LayoutContainerProps {
  children: ReactNode;
}

export function LayoutContainer({ children }: LayoutContainerProps) {
  const {
    isMobile,
    isSideMenuOpen,
    menuItemsData,
    handleDrawerToggle,
  } = useLayoutState();

  return (
    <Layout
      isMobile={isMobile}
      isSideMenuOpen={isSideMenuOpen}
      menuItemsData={menuItemsData}
      onDrawerToggle={handleDrawerToggle}
    >
      {children}
    </Layout>
  );
} 