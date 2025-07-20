# Cocktail Database Application

A React-based web application that displays cocktail information fetched from TheCocktailDB API.

## 📋 Task Description

Implement an application that displays data retrieved via API with a responsive interface and proper navigation.

## 🔗 API Details

- **Base URL**: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=<cocktail_code>`
- **Available cocktail codes**:
  - `margarita`
  - `mojito`
  - `a1`
  - `kir`

## ✨ Features

### Core Functionality

- **State Management**: Uses Redux Toolkit for data storage and preventing duplicate API requests
- **Dynamic Routing**: Each cocktail code generates a menu item and corresponding URL page
- **Active Menu Highlighting**: Current page is visually highlighted in navigation
- **Default Route**: First menu item serves as home page with its own URL
- **Root Redirect**: Accessing "/" redirects to the first menu item's URL
- **404 Error Handling**: Custom not found page for invalid routes
- **Lazy Loading**: Images are loaded only when needed for better performance
- **Internationalization**: English language support with react-i18next
- **Environment Configuration**: Configurable API endpoints via environment variables

### Technical Requirements

- **Responsive Design**: Flexible layout with max-width 1024px and min-width 360px
- **Cross-browser Support**: Compatible with Chrome and Safari
- **TypeScript**: Full type safety implementation
- **Testing**: Jest setup for unit testing
- **Code Quality**: ESLint configuration for consistent code style

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **Build Tool**: Vite
- **Styling**: SCSS + PostCSS
- **Routing**: React Router
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint
- **Package Manager**: npm

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://www.thecocktaildb.com/api/json/v1/1/
```

See `env.example` for the complete list of available environment variables.

### Development

```bash
npm run dev
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── CocktailDetails/ # Cocktail detail display component
│   ├── Layout/          # Application layout wrapper
│   ├── LoadingSpinner/  # Loading indicator
│   ├── NotFound/        # 404 error component
│   └── SideMenu/        # Navigation menu
├── pages/              # Application pages
│   ├── CocktailPage/    # Cocktail detail page
│   └── NotFoundPage/    # 404 error page
├── routing/            # Application routing
│   ├── router.tsx       # Router configuration
│   └── routing.test.tsx # Routing tests
├── config/             # Application configuration
│   ├── index.ts         # Environment variables and config
│   └── config.test.ts   # Configuration tests
├── i18n/               # Internationalization
│   └── locales/         # Translation files (en)
├── constants/           # Application constants
├── store/              # Redux store configuration
│   └── app/            # API slice and types
├── utils/              # Utility functions
└── main.tsx            # Application entry point
```

## 🎯 Requirements Implementation

- ✅ API data fetching with state management
- ✅ Dynamic menu generation from cocktail codes
- ✅ URL-based navigation with active states
- ✅ Default route handling
- ✅ 404 error page
- ✅ Responsive design (360px - 1024px)
- ✅ Image lazy loading
- ✅ TypeScript implementation
- ✅ Jest testing setup
- ✅ ESLint configuration
- ✅ Internationalization setup (English)
- ✅ Environment variables configuration

## 🌐 Browser Support

- Chrome (latest)
- Safari (latest)

## 📝 License

This project is part of a technical assessment.
