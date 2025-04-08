import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors({ origin: "*" }));
export default {
  port: 4001,
  fetch: app.fetch,
}

