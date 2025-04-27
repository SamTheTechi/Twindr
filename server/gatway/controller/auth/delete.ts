import type { ServiceError } from "@grpc/grpc-js"
import type { Context } from "hono"
import { client } from "core/auth/grpc"

export const deleteUser = async (c: Context) => {
  try {
    const { contact } = await c.req.json()
    const response = await new Promise<{ token: string }>((resolve, reject) => {
      client.Delete({ contact }, (err: ServiceError, response: any) => {
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

