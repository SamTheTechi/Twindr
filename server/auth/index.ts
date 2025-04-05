import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors({ origin: "*" }));

app.get("/", (c) => {
  return c.text("Hello from auth service oola ")
})

export default {
  port: 4000,
  fetch: app.fetch,
}

