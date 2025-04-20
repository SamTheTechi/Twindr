import { Hono } from "hono";
import { cors } from "hono/cors";
import { Auth } from "routes/auth";

const app = new Hono();

app.use(cors({ origin: "*" }));

app.route("/auth", Auth)

export default {
  port: 4001,
  fetch: app.fetch,
}

