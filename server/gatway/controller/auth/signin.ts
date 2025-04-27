import type { ServiceError } from "@grpc/grpc-js"
import type { Context } from "hono";
import { SigninSchema, type Signin } from "core/auth/validator/signin";
import { client } from "core/auth/grpc"

export const signInUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const parsed = SigninSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ msg: "invalide parameters" })
    }
    const contact: Signin = parsed.data;
    const response = await new Promise<{ token: string }>((resolve, reject) => {
      client.SignUp(contact, (err: ServiceError, response: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      });
    })
    return c.json({ token: response.token })
  } catch (err: any) {
    console.log(err)
    return c.json({ msg: "Something went wrong" })
  }
};


