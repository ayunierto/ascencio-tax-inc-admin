import { z } from 'zod';

export const createAccountSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  icon: z.string(),
  description: z.string().optional(),
  currencyId: z.string().uuid(),
  accountTypeId: z.string().uuid(),
});

export const updateAccountSchema = createAccountSchema.extend({
  id: z.string().uuid(),
});

export type CreateAccountInputs = z.infer<typeof createAccountSchema>;
export type UpdateAccountInputs = z.infer<typeof updateAccountSchema>;
