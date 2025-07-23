import config from './index';

describe('Config', () => {
  it('should have API base URL configured', () => {
    expect(config.api.baseUrl).toBeDefined();
    expect(typeof config.api.baseUrl).toBe('string');
    expect(config.api.baseUrl).toMatch(/^https?:\/\//);
  });

  it('should use correct default API URL', () => {
    expect(config.api.baseUrl).toContain('thecocktaildb.com');
    expect(config.api.baseUrl).toContain('/api/json/v1/1/');
  });

  it('should have the correct config structure', () => {
    expect(config).toHaveProperty('api');
    expect(config.api).toHaveProperty('baseUrl');
  });

  it('should provide a valid URL format', () => {
    // Should be a valid URL
    expect(() => new URL(config.api.baseUrl)).not.toThrow();
  });

  it('should end with slash for proper API endpoint concatenation', () => {
    expect(config.api.baseUrl).toMatch(/\/$/);
  });
}); 