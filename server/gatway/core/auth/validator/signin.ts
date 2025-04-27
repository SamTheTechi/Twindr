import { z } from "zod"

export const SigninSchema = z.object({
  contact: z.string()
}).strict()

export type Signin = z.infer<typeof SigninSchema>;
