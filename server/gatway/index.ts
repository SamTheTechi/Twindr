import { Hono } from "hono";
import { cors } from "hono/cors";
import { Auth } from "routes/auth";
import { Profile } from "routes/profile";

const app = new Hono();

app.use(cors({ origin: "*" }));

app.route("/auth", Auth)
app.route("/profile", Profile)

export default {
  port: 4001,
  fetch: app.fetch,
}

