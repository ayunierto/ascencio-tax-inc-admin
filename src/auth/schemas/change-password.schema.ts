import z from 'zod';

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, {
    message: 'Current password must be at least 6 characters long.',
  }),
  newPassword: z.string().min(6, {
    message: 'New password must be at least 6 characters long.',
  }),
});

export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;
