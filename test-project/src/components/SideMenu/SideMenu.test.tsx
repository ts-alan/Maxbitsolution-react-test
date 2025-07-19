import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SideMenu } from './SideMenu';

const menuItems = ['Margarita', 'Mojito', 'A1', 'Kir'];

describe('SideMenu component', () => {
    it('renders all menu items with correct links', () => {
        render(
            <MemoryRouter>
                <SideMenu isMobile={false} isOpen={true} onClose={() => {}} />
            </MemoryRouter>
        );

        menuItems.forEach(item => {
            const linkElement = screen.getByText(item).closest('a');
            expect(linkElement).toBeInTheDocument();
            expect(linkElement).toHaveAttribute('href', `/${item.toLowerCase()}`);
        });
    });

    it('calls onClose when an item is clicked on mobile', () => {
        const handleClose = jest.fn();
        render(
            <MemoryRouter>
                <SideMenu isMobile={true} isOpen={true} onClose={handleClose} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Margarita'));
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when an item is clicked on desktop', () => {
        const handleClose = jest.fn();
        render(
            <MemoryRouter>
                <SideMenu isMobile={false} isOpen={true} onClose={handleClose} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Margarita'));
        expect(handleClose).not.toHaveBeenCalled();
    });
}); 