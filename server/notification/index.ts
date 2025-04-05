import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors({ origin: "*" }));

app.get("/", (c) => {
  return c.text("Hello from notification service")
})

export default {
  port: 4005,
  fetch: app.fetch,
}

