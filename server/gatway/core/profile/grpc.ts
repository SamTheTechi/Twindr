import * as grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
import { fileURLToPath } from "url";

const PROTO_PATH = fileURLToPath(import.meta.resolve('@packages/proto/auth.proto'))
const packageDefination = await protoLoader.load(PROTO_PATH, {})
const grpcObject = grpc.loadPackageDefinition(packageDefination);
const authPackage = grpcObject.auth as any;
export const client = new authPackage.v1.AuthService("localhost:3001", grpc.credentials.createInsecure())

