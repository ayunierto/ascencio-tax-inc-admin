import { z } from 'zod';

export const createCurrencySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  coinSuffix: z.string().min(1, 'Coin suffix is required'),
  symbol: z.string().min(1, 'Symbol is required'),
});

export const updateCurrencySchema = createCurrencySchema.extend({
  id: z.string().uuid(),
});

export type CreateCurrencyRequest = z.ZodType<typeof createCurrencySchema>;
export type UpdateCurrencyRequest = z.infer<typeof updateCurrencySchema>;
