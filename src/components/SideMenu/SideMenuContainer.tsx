import { useNavigation } from '../../hooks/useNavigation';
import { SideMenu } from './SideMenu';

interface SideMenuContainerProps {
  isOpen: boolean;
}

export function SideMenuContainer({ isOpen }: SideMenuContainerProps) {
  const { currentPath, menuItemsData } = useNavigation();

  return (
    <SideMenu
      isOpen={isOpen}
      currentPath={currentPath}
      menuItemsData={menuItemsData}
    />
  );
} 