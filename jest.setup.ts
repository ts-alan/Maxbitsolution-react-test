import "@testing-library/jest-dom";
import "whatwg-fetch";
import { TextEncoder, TextDecoder } from "util";
import { TransformStream } from "stream/web";

// Set up environment variables for tests
process.env['VITE_API_BASE_URL'] = "https://www.thecocktaildb.com/api/json/v1/1/";

// Polyfill for TextEncoder/TextDecoder
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Polyfill for TransformStream (needed for MSW)
(global as any).TransformStream = TransformStream;

// Polyfill for BroadcastChannel (needed for MSW)
(global as any).BroadcastChannel = class BroadcastChannel {
  constructor(public name: string) {}
  addEventListener() {}
  removeEventListener() {}
  postMessage() {}
  close() {}
};

// Mock config module to avoid import.meta issues in tests
jest.mock('./src/config', () => ({
  __esModule: true,
  default: {
    api: {
      baseUrl: "https://www.thecocktaildb.com/api/json/v1/1/",
    },
  },
}));

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
}); 