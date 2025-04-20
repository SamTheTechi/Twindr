import * as grpc from "@grpc/grpc-js"
import { Delete } from "../services/delete"
import { HttpStatus } from "@packages/statusCodes/status";

interface DeleteRequest {
  contact: number,
}

export const delte = async (
  call: grpc.ServerUnaryCall<DeleteRequest, {}>,
  callback: grpc.sendUnaryData<{}>
) => {
  try {
    const contact: number = call.request.contact;
    const [status]: [number] = await Delete(contact);

    if (status === HttpStatus.OK) {
      return callback(null, {})
    }

    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "Invalid contact number"
    });

  } catch (err: any) {
    return callback({
      code: grpc.status.INTERNAL,
      message: err?.message || "Internal error"
    })
  }
}
