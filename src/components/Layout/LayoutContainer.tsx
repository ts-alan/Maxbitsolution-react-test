import { type ReactNode } from 'react';
import { Layout } from './Layout';

interface LayoutContainerProps {
  children: ReactNode;
}

export function LayoutContainer({ children }: LayoutContainerProps) {
  return <Layout>{children}</Layout>;
} 