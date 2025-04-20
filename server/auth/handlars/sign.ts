import * as grpc from "@grpc/grpc-js"
import { SignUp } from "../services/sign"
import { HttpStatus } from "@packages/statusCodes/status";

interface SignUpRequest {
  contact: number,
}
interface SignUpResponse {
  token: string,
}

export const signup = async (
  call: grpc.ServerUnaryCall<SignUpRequest, SignUpResponse>,
  callback: grpc.sendUnaryData<SignUpResponse>
) => {
  try {
    const contact: number = call.request.contact;
    const [status, token]: [number, string | null] = await SignUp(contact);


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
