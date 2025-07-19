import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from './NotFound';

describe('NotFound component', () => {
    it('renders 404 error and a link to the homepage', () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>
        );

        // Ищем заголовок "404"
        expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
        
        // Ищем текст "Page Not Found"
        expect(screen.getByText('Page Not Found')).toBeInTheDocument();

        // Проверяем наличие ссылки на главную страницу
        const homeLink = screen.getByRole('link', { name: /go back to home/i });
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
    });
}); 