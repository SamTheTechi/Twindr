import type { PatchProfileRequest, PatchProfileResponse } from "core/types/patchProfile";
import { PatchProfile } from "services/patchProfile"
import { type ServerUnaryCall, type sendUnaryData, status } from "@grpc/grpc-js"
import { HttpStatus } from "@packages/statusCodes/status";

export const patchProfile = async (
  call: ServerUnaryCall<PatchProfileRequest, PatchProfileResponse>,
  callback: sendUnaryData<PatchProfileResponse>
) => {

  try {
    const request = call.request;
    console.log(request) // here

    return callback({});

  } catch (err: any) {
    return callback({
      code: status.INTERNAL,
      message: err?.message || "Internal error"
    })
  }
}
