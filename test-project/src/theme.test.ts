import theme from './theme';

describe('Theme configuration', () => {
    it('should have correct breakpoint values', () => {
        expect(theme.breakpoints.values.xs).toBe(360);
        expect(theme.breakpoints.values.sm).toBe(600);
        expect(theme.breakpoints.values.md).toBe(900);
        expect(theme.breakpoints.values.lg).toBe(1024);
        expect(theme.breakpoints.values.xl).toBe(1536);
    });

    it('should have responsive design requirements', () => {
        // Проверяем, что минимальная ширина соответствует требованиям
        expect(theme.breakpoints.values.xs).toBe(360);
        // Проверяем, что максимальная ширина соответствует требованиям
        expect(theme.breakpoints.values.lg).toBe(1024);
    });
}); 