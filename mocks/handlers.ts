// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  // Handles a POST /login request
  rest.get("/mock", (_, res, ctx) => {
    return res(
      ctx.body("Hello world"),
      ctx.status(200),
    );
  }),
];
