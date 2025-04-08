import type { JwtVariables } from "hono/jwt";
import type { Password } from "bun";
import { jwt } from "hono/jwt";
import { password } from "bun";

const data = {
  user_id: "something something...",
  login: [
    {
      type: "phone",
      value: "911xxxxx81",
    },
    {
      type: "google",
      value: "something....",
    }
  ]
}

export const SignupUsingContact = async (contact: number) => {

}
