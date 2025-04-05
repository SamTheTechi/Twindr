import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors({ origin: "*" }));

app.get("/", (c) => {
  return c.text("Hello from recommendation service")
})

export default {
  port: 4006,
  fetch: app.fetch,
}

