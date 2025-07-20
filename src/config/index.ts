interface Config {
  api: {
    baseUrl: string;
  };
}

// В браузере Vite заменяет import.meta.env.* на фактические значения на этапе сборки
// В тестах используем мок из jest.setup.ts
const config: Config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://www.thecocktaildb.com/api/json/v1/1/',
  },
};

export default config; 