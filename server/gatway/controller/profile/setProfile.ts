import type { Context } from "hono";

export const SetProfile = async (c: Context) => {
  try {
    return c.json({ msg: "hello from setprofile" })
  } catch (err: any) {
    console.log(err)
    return c.json({ msg: "Something went wrong" })
  }
};


