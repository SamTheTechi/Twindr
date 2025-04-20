import type { Context } from "hono";

export const UpdateProfile = async (c: Context) => {
  try {
    return c.json({ msg: "hello from updateprofile" })
  } catch (err: any) {
    console.log(err)
    return c.json({ msg: "Something went wrong" })
  }
};



