import z from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  duration: z.number().int("Duration must be an integer"),
  price: z.number().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  isAvailableOnline: z.boolean(),
  isActive: z.boolean(),
  image: z.string().optional(),
  staff: z.array(z.string()).optional(),
});

export type CreateServiceRequest = z.infer<typeof createServiceSchema>;
