import "@testing-library/jest-dom";
import "whatwg-fetch";
import { TextEncoder, TextDecoder } from "util";
import { TransformStream } from "stream/web";

if (typeof global.BroadcastChannel === "undefined") {
  global.BroadcastChannel = class {
    constructor(_name: string) {}
    postMessage(_message: any) {}
    close() {}
    onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null =
      null;
    onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => any) | null =
      null;
    addEventListener(
      _type: string,
      _listener: EventListenerOrEventListenerObject,
      _options?: boolean | AddEventListenerOptions,
    ): void {}
    removeEventListener(
      _type: string,
      _listener: EventListenerOrEventListenerObject,
      _options?: boolean | EventListenerOptions,
    ): void {}
    dispatchEvent(_event: Event): boolean {
      return false;
    }
  } as any;
}

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
global.TransformStream = TransformStream as any;
