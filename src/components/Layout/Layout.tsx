import { type ReactNode } from 'react';
import { SideMenu } from '../SideMenu/SideMenu';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-container">
      <SideMenu />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
} 