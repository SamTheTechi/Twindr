import { z } from "zod"

export const SetProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.string(),
  gender: z.string(),
  contact: z.string(),
  bio: z.object({
    drink: z.boolean(),
    smoke: z.boolean(),
    workout: z.string(),
    relationType: z.string(),
    education: z.string(),
    interests: z.array(z.string()),
    photos: z.array(z.string())
  })
}).strict()

export type SetProfile = z.infer<typeof SetProfileSchema>;
