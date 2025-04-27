import { fileURLToPath } from "url"
import { mongoClient } from "core/mongoClient"
import * as grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
import { patchProfile } from "handlars/patchProfile"
import { getProfile } from "handlars/getProfile"
import { setProfile } from "handlars/setProfile"

const PROTO_PATH = fileURLToPath(import.meta.resolve('@packages/proto/profile.proto'))
const packageDefination = await protoLoader.load(PROTO_PATH, {})
const grpcObject = grpc.loadPackageDefinition(packageDefination);
export const profilePackage = grpcObject.profile as any;

const server = new grpc.Server();
server.addService(profilePackage.v1.ProfileService.service, {
  GetProfile: getProfile,
  SetProfile: setProfile,
  PatchProfile: patchProfile,
});

server.bindAsync(
  "0.0.0.0:3002",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error(`Server crashed: ${error.message}`);
    } else {
      mongoClient()
      console.log(`profile gRPC server running on port ${port}`);
    }
  });

