import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(3, 'Name must contain at least 3 character(s)'),
  duration: z.number(),
  price: z.number(),
  description: z.string().optional(),
  address: z.string().min(3, 'Address must contain at least 3 character(s)'),
  isAvailableOnline: z.boolean(),
  isActive: z.boolean(),
  //   TODO: Change for File type
  image: z.string(),
});

export const updateServiceSchema = createServiceSchema.extend({
  id: z.string().uuid(),
});

export type CreateServiceRequest = z.ZodType<typeof createServiceSchema>;
export type UpdateServiceRequest = z.infer<typeof updateServiceSchema>;
