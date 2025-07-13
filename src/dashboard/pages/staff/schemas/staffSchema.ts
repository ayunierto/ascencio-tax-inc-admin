import { z } from 'zod';

export const createStaffSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First name must contain at least 3 character(s)'),
  lastName: z.string().min(3, 'Last name must contain at least 3 character(s)'),
  isActive: z.boolean().default(true),
  services: z.array(z.string()),
  //   .refine((value) => value.some((item) => item), {
  //   message: 'You have to select at least one item.',
  // }),
  schedules: z.array(z.string()),
  // .refine((value) => value.some((item) => item), {
  //   message: 'You have to select at least one item.',
  // }),
});

export const updateStaffSchema = createStaffSchema.extend({
  id: z.string().uuid(),
});

export type CreateStaffRequest = z.ZodType<typeof createStaffSchema>;
export type UpdateStaffRequest = z.infer<typeof updateStaffSchema>;
