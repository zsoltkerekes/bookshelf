// vitest-setup.js (can be any file name)
import { vi } from "vitest";
import React from "react";

Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  enumerable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Also attach to window for libraries that reference window.matchMedia
if (globalThis.window !== undefined && !("matchMedia" in globalThis.window)) {
  Object.defineProperty(globalThis.window, "matchMedia", {
    writable: true,
    enumerable: true,
    value: globalThis.matchMedia,
  });
}

// Mock Next.js Image to a plain img for tests
vi.mock("next/image", () => ({
  default: (props) => React.createElement("img", { ...props }),
}));
