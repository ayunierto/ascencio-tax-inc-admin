import z from 'zod';

export const resetPasswordSchema = z.object({
  email: z.string().email({
    message: 'Email must be a valid email.',
  }),
  code: z
    .string()
    .min(6, {
      message: 'Code must be at least 6 characters long.',
    })
    .max(6, {
      message: 'Code must be exactly 6 characters long.',
    }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long.',
  }),
});

export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;
