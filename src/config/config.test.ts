import config from './index';

describe('Config', () => {
  it('should have API base URL configured', () => {
    expect(config.api.baseUrl).toBeDefined();
    expect(typeof config.api.baseUrl).toBe('string');
    expect(config.api.baseUrl).toMatch(/^https?:\/\//);
  });

  it('should use mocked config in tests', () => {
    // In tests, a mock from jest.setup.ts is used to avoid issues with import.meta
    expect(config.api.baseUrl).toContain('thecocktaildb.com');
  });
}); 