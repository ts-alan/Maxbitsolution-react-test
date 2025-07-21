import { type ReactNode } from 'react';
import { useLayoutState } from '../../hooks/useLayoutState';
import { Layout } from './Layout';

interface LayoutContainerProps {
  children: ReactNode;
}

export function LayoutContainer({ children }: LayoutContainerProps) {
  const {
    isMobile,
    menuItemsData
  } = useLayoutState();

  return (
    <Layout
      isMobile={isMobile}
      menuItemsData={menuItemsData}
    >
      {children}
    </Layout>
  );
} 