import z from "zod";

export const staffSchema = z.object({
  id: z.string(),
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  isActive: z.boolean(),
  schedules: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
});

export type Staff = z.infer<typeof staffSchema>;
