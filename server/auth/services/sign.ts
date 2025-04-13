import type { JwtVariables } from "hono/jwt";
import type { Password } from "bun";
import { BloomFilter } from "../../../packages/bloomfilters/bloom"
import { jwt } from "hono/jwt";
import { password, env } from "bun";

export const SignUp = async (contact: number) => {
  try {
    if (!contact) {
      return
    }
  } catch (error) {

  }
}
