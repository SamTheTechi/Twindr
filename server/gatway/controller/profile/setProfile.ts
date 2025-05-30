import type { Context } from "hono";
import type { ServiceError } from "@grpc/grpc-js";
import { type SetProfile, SetProfileSchema } from "core/profile/validator/setProfile";
import { client } from "core/profile/grpc"

export const setProfile = async (c: Context) => {
  try {
    const body = await c.req.json()
    const parsed = SetProfileSchema.safeParse(body)

    if (!parsed.success) {
      return c.json({ msg: "invalide type" })
    }

    const profile: SetProfile = parsed.data;
    const response = await new Promise<any>((resolve, reject) => {
      client.SetProfile(profile, (err: ServiceError, response: any) => {
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


