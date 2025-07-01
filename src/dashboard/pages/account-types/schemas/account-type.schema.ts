import { z } from 'zod';

export const createAccountTypeSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  description: z.string().optional(),
});

export const updateAccountTypeSchema = createAccountTypeSchema.extend({
  id: z.string().uuid(),
});

export type CreateAccountTypeInputs = z.infer<typeof createAccountTypeSchema>;
export type UpdateAccountTypeInputs = z.infer<typeof updateAccountTypeSchema>;
