import type { Context } from "hono";
import type { ServiceError } from "@grpc/grpc-js";
import { client } from "core/profile/grpc"

export const getProfile = async (c: Context) => {
  try {
    const id = 123123;
    const response = await new Promise<any>((resolve, reject) => {
      client.GetProfile({ id }, (err: ServiceError, response: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      });
    })
    return c.json({ msg: `profile added ${response}` })
  } catch (err: any) {
    console.log(err)
    return c.json({ msg: "Something went wrong" })
  }
};


