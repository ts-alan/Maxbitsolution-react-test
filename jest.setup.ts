import "@testing-library/jest-dom";
import "whatwg-fetch";
import { TextEncoder, TextDecoder } from "util";
import { TransformStream } from "stream/web";

// Environment variables for tests
process.env['VITE_API_BASE_URL'] = "https://www.thecocktaildb.com/api/json/v1/1/";

// Polyfills for Node.js environment
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.TextDecoder = TextDecoder;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.TransformStream = TransformStream;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.BroadcastChannel = class BroadcastChannel {
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
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
}); 