import z from "zod";

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Name must have at least 3 characters"),
  duration: z.number().int("Duration must be an integer"),
  price: z.number().optional(),
  description: z.string().optional(),
  address: z.string(),
  isAvailableOnline: z.boolean(),
  isActive: z.boolean(),
  image: z.string().optional(),
  staff: z.array(z.string()).optional(),
});

export type Service = z.infer<typeof serviceSchema>;
