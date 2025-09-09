import z from 'zod';

export const deleteAccountSchema = z.object({
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long.',
  }),
});

export type DeleteAccountRequest = z.infer<typeof deleteAccountSchema>;
