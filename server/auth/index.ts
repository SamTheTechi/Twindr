import { fileURLToPath } from "url"
import * as grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
import { signup } from "handlars/sign";
import { delte } from "handlars/delete";
import { login } from "handlars/login";

const PROTO_PATH = fileURLToPath(import.meta.resolve('@packages/proto/auth.proto'))
const packageDefination = await protoLoader.load(PROTO_PATH, {})
const grpcObject = grpc.loadPackageDefinition(packageDefination);
export const authPackage = grpcObject.auth as any;

const server = new grpc.Server();
server.addService(authPackage.v1.AuthService.service, {
  SignUp: signup,
  Login: login,
  Delete: delte,
});

server.bindAsync(
  "0.0.0.0:3001",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error(`Server crashed: ${error.message}`);
    } else {
      console.log(`gRPC server running on port ${port}`);
    }
  });

