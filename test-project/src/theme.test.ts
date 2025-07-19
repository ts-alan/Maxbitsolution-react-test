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
        // Check if the minimum width meets the requirements
        expect(theme.breakpoints.values.xs).toBe(360);
        // Check if the maximum width meets the requirements
        expect(theme.breakpoints.values.lg).toBe(1024);
    });
}); 