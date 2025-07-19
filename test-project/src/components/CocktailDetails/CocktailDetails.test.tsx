import { render, screen } from '@testing-library/react';
import { CocktailDetails } from './CocktailDetails';

const mockDrink = {
    idDrink: '11007',
    strDrink: 'Margarita',
    strCategory: 'Ordinary Drink',
    strAlcoholic: 'Alcoholic',
    strGlass: 'Cocktail glass',
    strInstructions: 'Rub the rim of the glass with lime slice.',
    strDrinkThumb: 'margarita.jpg',
    strIngredient1: 'Tequila',
    strMeasure1: '1 1/2 oz ',
    strIngredient2: 'Triple sec',
    strMeasure2: '1/2 oz ',
    strIngredient3: 'Lime juice',
    strMeasure3: '1 oz ',
};

describe('CocktailDetails component', () => {
    it('renders all cocktail details correctly', () => {
        render(<CocktailDetails drink={mockDrink} />);

        // Проверяем наличие основной информации
        expect(screen.getByRole('heading', { name: 'Margarita' })).toBeInTheDocument();
        expect(screen.getByText('Ordinary Drink')).toBeInTheDocument();
        expect(screen.getByText('Alcoholic')).toBeInTheDocument();
        expect(screen.getByText('Cocktail glass')).toBeInTheDocument();
        expect(screen.getByText(/Rub the rim of the glass/)).toBeInTheDocument();

        // Проверяем наличие изображения
        const image = screen.getByRole('img', { name: 'Margarita' });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'margarita.jpg');

        // Проверяем список ингредиентов
        expect(screen.getByText(/1 1\/2 oz Tequila/)).toBeInTheDocument();
        expect(screen.getByText(/1\/2 oz Triple sec/)).toBeInTheDocument();
        expect(screen.getByText(/1 oz Lime juice/)).toBeInTheDocument();
    });
}); 