import { SetProfile } from "services/setProfile"
import type { SetProfileRequest, SetProfileResponse } from "core/types/setProfile";
import { type ServerUnaryCall, type sendUnaryData, status } from "@grpc/grpc-js"
import { HttpStatus } from "@packages/statusCodes/status";

export const setProfile = async (
  call: ServerUnaryCall<SetProfileRequest, SetProfileResponse>,
  callback: sendUnaryData<SetProfileResponse>
) => {

  try {
    const request = call.request;
    console.log(request)

    return callback({});

  } catch (err: any) {
    return callback({
      code: status.INTERNAL,
      message: err?.message || "Internal error"
    })
  }
}
