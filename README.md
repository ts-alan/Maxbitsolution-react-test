# Cocktail App

Simple React application for browsing cocktail recipes from TheCocktailDB API.

## Setup

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Check code style
- `npm run format` - Format code with Prettier

## Configuration

Create `.env` file (optional):
```
VITE_API_BASE_URL=https://www.thecocktaildb.com/api/json/v1/1/
```

## Tech Stack

- React 18 + TypeScript
- Redux Toolkit + RTK Query
- Vite
- Simple CSS

## Quality Gates

1. TypeScript (type checking)
2. ESLint (code linting)
3. Prettier (code formatting)
4. Vite (build tool)

## Features

- View cocktail recipes for margarita, mojito, a1, kir
- Responsive design (360px - 1024px)
- Lazy loading images
- Multiple cocktail variants per type
- Simple, clean interface matching wireframe design
