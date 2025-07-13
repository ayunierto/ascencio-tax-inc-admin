import { z } from 'zod';

export const createAccountSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must not exceed 100 characters'),
  icon: z
    .string()
    .min(2, 'Icon must be at least 2 characters long')
    .max(100, 'Icon must not exceed 100 characters'),
  description: z.string().optional(),
  currencyId: z.string().uuid(),
  accountTypeId: z.string().uuid(),
});

export const updateAccountSchema = createAccountSchema.extend({
  id: z.string().uuid(),
});

export type CreateAccountRequest = z.ZodType<typeof createAccountSchema>;
export type UpdateAccountRequest = z.infer<typeof updateAccountSchema>;
