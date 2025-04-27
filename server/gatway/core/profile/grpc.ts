import * as grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
import { fileURLToPath } from "url";

const PROTO_PATH = fileURLToPath(import.meta.resolve('@packages/proto/profile.proto'))
const packageDefination = await protoLoader.load(PROTO_PATH, {})
const grpcObject = grpc.loadPackageDefinition(packageDefination);
const profilePackage = grpcObject.profile as any;
export const client = new profilePackage.v1.ProfileService("localhost:3002", grpc.credentials.createInsecure())

