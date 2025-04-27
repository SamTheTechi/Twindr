import { z } from "zod"

export const LoginSchema = z.object({
  contact: z.string()
}).strict()

export type Login = z.infer<typeof LoginSchema>;
