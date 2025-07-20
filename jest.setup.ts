import "@testing-library/jest-dom";
import "whatwg-fetch";
import { TextEncoder, TextDecoder } from "util";
import { TransformStream } from "stream/web";

// Set up environment variables for tests
process.env['VITE_API_BASE_URL'] = "https://www.thecocktaildb.com/api/json/v1/1/";

// Mock config module to avoid import.meta issues in tests
jest.mock('./src/config', () => ({
  __esModule: true,
  default: {
    api: {
      baseUrl: "https://www.thecocktaildb.com/api/json/v1/1/",
    },
  },
}));

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Простой мок переводов для тестов
      const translations: Record<string, string> = {
        "cocktails.margarita": "Margarita",
        "cocktails.mojito": "Mojito",
        "cocktails.a1": "A1",
        "cocktails.kir": "Kir",
        "cocktails.loading": "Loading cocktail...",
        "cocktails.category": "Category",
        "cocktails.type": "Type",
        "cocktails.glass": "Glass",
        "cocktails.instructions": "Instructions",
        "cocktails.ingredients": "Ingredients",
        "notFound.title": "404",
        "notFound.subtitle": "Page Not Found",
        "notFound.description": "Sorry, we couldn't find the page you're looking for.",
        "notFound.goHome": "Go back to Home",
      };
      return translations[key] || key;
    },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: jest.fn(),
  },
}));

if (typeof global.BroadcastChannel === "undefined") {
  global.BroadcastChannel = class {
    constructor() {}
    postMessage() {}
    close() {}
    onmessage: ((this: BroadcastChannel, ev: MessageEvent) => unknown) | null =
      null;
    onmessageerror:
      | ((this: BroadcastChannel, ev: MessageEvent) => unknown)
      | null = null;
    addEventListener(): void {}
    removeEventListener(): void {}
    dispatchEvent(): boolean {
      return false;
    }
  } as unknown as typeof BroadcastChannel;
}

global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextDecoder = TextDecoder as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TransformStream = TransformStream as any;
