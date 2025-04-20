import { readFile } from "fs/promises";
import path from "path";

export const loadKey = async (filename: string) => {
  const filePath = path.resolve(process.cwd(), filename);
  return await readFile(filePath, "utf-8");
};
