import z from "zod";

export const createStaffSchema = z.object({
  firstName: z
    .string()
    .min(3, "The first name must have a minimum of 3 characters"),
  lastName: z
    .string()
    .min(3, "The last name must have a minimum of 3 characters"),
  isActive: z.boolean(),
  services: z.array(z.string()).optional(),
  schedules: z.array(z.string()).optional(),
});

export type CreateStaffRequest = z.infer<typeof createStaffSchema>;
