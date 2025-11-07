import z from 'zod';

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name must have at least 3 characters'),
  durationMinutes: z.number().int('Duration must be an integer'),
  description: z.string().optional(),
  address: z.string(),
  isAvailableOnline: z.boolean(),
  isActive: z.boolean(),
  imageUrl: z.string().optional(),
  staffIds: z.array(z.string()).optional(),
  // Transient field for file upload. Not stored in the database.
  imageFile: z.instanceof(File).optional(),
});

export type Service = z.infer<typeof serviceSchema>;
