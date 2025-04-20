import type { Context } from "hono";

export const GetProfile = async (c: Context) => {
  try {
    return c.json({ msg: "hello from getprofile" })
  } catch (err: any) {
    console.log(err)
    return c.json({ msg: "Something went wrong" })
  }
};


