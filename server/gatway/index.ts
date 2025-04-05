import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors({ origin: "*" }));

app.get("/", (c) => {
  return c.text("Hello from gateway service")
})

export default {
  port: 4001,
  fetch: app.fetch,
}

