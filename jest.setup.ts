import "@testing-library/jest-dom";
import "whatwg-fetch";
import { TextEncoder, TextDecoder } from "util";
import { TransformStream } from "stream/web";

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
