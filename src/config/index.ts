interface Config {
  api: {
    baseUrl: string;
  };
}

// Vite replaces import.meta.env.* with actual values during build
const config: Config = {
  api: {
    baseUrl:
      import.meta.env.VITE_API_BASE_URL ||
      "https://www.thecocktaildb.com/api/json/v1/1/",
  },
};

export default config;
