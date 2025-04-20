import { nanoid } from "nanoid"
export const generateUID = (contact: number): string => {
  const uniqueId = nanoid(12)
  return `${uniqueId}_${contact}`
}
