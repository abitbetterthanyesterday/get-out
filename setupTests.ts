import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, expect } from "vitest";

import { server } from "./mocks/server";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen()
  console.info("🔶 Mock server running");
});

afterEach(() => {
  // runs a cleanup after each test case (e.g. clearing jsdom)
  cleanup();
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers());
});

// Clean up after the tests are finished.
afterAll(() => server.close());
