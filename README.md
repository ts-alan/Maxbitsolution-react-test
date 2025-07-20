# Cocktail Database

React application for browsing cocktail recipes from TheCocktailDB API.

## Setup

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Check code style

## Configuration

Create `.env` file:
```
VITE_API_BASE_URL=https://www.thecocktaildb.com/api/json/v1/1
```

## Architecture

- **Components**: Presentation layer with container/presentational pattern
- **Hooks**: Business logic and state management  
- **Utils**: Data transformation utilities
- **Store**: Redux Toolkit for API state management
- **Routing**: React Router with dynamic menu generation

## Tech Stack

- React 18 + TypeScript
- Redux Toolkit + RTK Query
- Vite + Jest
- Material-UI
- React Router

## Project Structure

```
src/
├── components/
│   ├── CocktailDetails/
│   ├── Layout/
│   ├── LoadingSpinner/
│   ├── NotFound/
│   └── SideMenu/
├── hooks/
├── pages/
├── routing/
├── config/
├── constants/
├── store/
└── utils/
```
