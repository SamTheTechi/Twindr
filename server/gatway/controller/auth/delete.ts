import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
import type { Context } from "hono"

export const DeleteUser = async (c: Context) => {
  return c.json({ message: "User Deleted" })
};

