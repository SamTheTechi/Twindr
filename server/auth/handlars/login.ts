import * as grpc from "@grpc/grpc-js"
import { Login } from "../services/login"
import { HttpStatus } from "@packages/statusCodes/status";

interface LoginRequest {
  contact: number,
}
interface LoginResponse {
  token: string,
}

export const login = async (
  call: grpc.ServerUnaryCall<LoginRequest, LoginResponse>,
  callback: grpc.sendUnaryData<LoginResponse>
) => {
  try {
    const contact: number = call.request.contact;
    const [status, token]: [number, string | null] = await Login(contact);


    if (status === HttpStatus.CREATED && token) {
      return callback(null, { token })
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
