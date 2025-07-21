interface Config {
  api: {
    baseUrl: string;
  };
}

// In the browser, Vite replaces import.meta.env.* with actual values at build time
// In tests, we use a mock from jest.setup.ts
const config: Config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://www.thecocktaildb.com/api/json/v1/1/',
  },
};

export default config; 