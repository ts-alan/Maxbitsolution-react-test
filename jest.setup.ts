import "@testing-library/jest-dom";
import "whatwg-fetch";
import { TextEncoder, TextDecoder } from "util";
import { TransformStream } from "stream/web";

// Устанавливаем переменные окружения для тестов
process.env['VITE_API_BASE_URL'] = "https://www.thecocktaildb.com/api/json/v1/1/";

// Полифил для TextEncoder/TextDecoder
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Полифил для TransformStream (необходим для MSW)
(global as any).TransformStream = TransformStream;

// Полифил для BroadcastChannel (необходим для MSW)
(global as any).BroadcastChannel = class BroadcastChannel {
  constructor(public name: string) {}
  addEventListener() {}
  removeEventListener() {}
  postMessage() {}
  close() {}
};

// Мокаем модуль конфигурации, чтобы избежать проблем с import.meta в тестах
jest.mock('./src/config', () => ({
  __esModule: true,
  default: {
    api: {
      baseUrl: "https://www.thecocktaildb.com/api/json/v1/1/",
    },
  },
}));

// Мокаем window.matchMedia для тестов адаптивности
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // устарело
    removeListener: jest.fn(), // устарело
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
}); 