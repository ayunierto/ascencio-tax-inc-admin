import { z } from 'zod';

export const createCurrencySchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  coinSuffix: z
    .string()
    .min(2, { message: 'Coin suffix must be at least 2 characters.' }),
  symbol: z
    .string()
    .min(1, { message: 'Symbol must be at least 1 characters.' }),
});

export const updateCurrencySchema = createCurrencySchema.extend({
  id: z.string().uuid(),
});

export type CreateCurrencyInputs = z.infer<typeof createCurrencySchema>;
export type UpdateCurrencyInputs = z.infer<typeof updateCurrencySchema>;
