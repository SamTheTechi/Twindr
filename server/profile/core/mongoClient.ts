import { connect } from "mongoose";

export const mongoClient = async () => {
  try {
    await connect("mongodb://sysAdmin:sam@localhost:27017"), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
    console.log("MongoDB connected successfully ✅")
  } catch (e) {
    console.error("MongoDB connection error ❌", e)
    process.exit(1)
  }
}
