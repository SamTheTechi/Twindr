import { z } from "zod"

export const PatchProfileSchema = z.object({
  drink: z.boolean().optional(),
  smoke: z.boolean().optional(),
  workout: z.string().optional(),
  relationType: z.string().optional(),
  education: z.string().optional(),
  interests: z.array(z.string()).optional(),
  photos: z.array(z.string()).optional()
}).strict()

export type PatchProfile = z.infer<typeof PatchProfileSchema>;
