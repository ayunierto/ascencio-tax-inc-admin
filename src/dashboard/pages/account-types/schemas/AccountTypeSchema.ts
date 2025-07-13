import { z } from 'zod';

export const createAccountTypeSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  description: z.string().optional(),
});

export const updateAccountTypeSchema = createAccountTypeSchema.extend({
  id: z.string().uuid(),
});

export type CreateAccountTypeRequest = z.infer<typeof createAccountTypeSchema>;
export type UpdateAccountTypeRequest = z.infer<typeof updateAccountTypeSchema>;
