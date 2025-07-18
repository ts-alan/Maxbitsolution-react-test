import { capitalizeFirst, generateMenuItems, getFirstCocktailCode } from './cocktail.utils';
import { CocktailCodeEnum } from '../constants/cocktail-code.enum';

describe('cocktail utils', () => {
    describe('capitalizeFirst', () => {
        it('should capitalize first letter', () => {
            expect(capitalizeFirst('margarita')).toBe('Margarita');
            expect(capitalizeFirst('a1')).toBe('A1');
            expect(capitalizeFirst('')).toBe('');
        });
    });

    describe('generateMenuItems', () => {
        it('should generate menu items from enum', () => {
            const menuItems = generateMenuItems();
            
            expect(menuItems).toHaveLength(4);
            expect(menuItems[0]).toMatchObject({
                text: 'Margarita',
                path: '/margarita',
                code: 'margarita'
            });
            expect(menuItems[0]?.Icon).toBeDefined();
        });

        it('should include all cocktail codes', () => {
            const menuItems = generateMenuItems();
            const codes = menuItems.map(item => item.code);
            
            expect(codes).toEqual(Object.values(CocktailCodeEnum));
        });
    });

    describe('getFirstCocktailCode', () => {
        it('should return first cocktail code', () => {
            expect(getFirstCocktailCode()).toBe(CocktailCodeEnum.Margarita);
        });
    });
}); 