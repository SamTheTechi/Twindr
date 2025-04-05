import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors({ origin: "*" }));

app.get("/", (c) => {
  return c.text("Hello from profile service")
})

export default {
  port: 4002,
  fetch: app.fetch,
}

