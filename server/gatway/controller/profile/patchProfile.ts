import type { Context } from "hono";
import type { ServiceError } from "@grpc/grpc-js";
import { PatchProfileSchema, type PatchProfile } from "core/profile/validator/patchProfile";
import { client } from "core/profile/grpc"

export const patchProfile = async (c: Context) => {
  try {
    const body = await c.req.json()
    const parsed = PatchProfileSchema.safeParse(body);

    if (!parsed.success) {
      return c.json({ msg: "invalid parameters" })
    }

    const profile: PatchProfile = parsed.data;
    const response = await new Promise<any>((resolve, reject) => {
      client.PatchProfile(profile, (err: ServiceError, response: any) => {
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



