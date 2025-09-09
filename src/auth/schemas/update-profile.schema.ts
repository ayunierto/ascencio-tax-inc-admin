import z from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  countryCode: z.string().optional(),
  phoneNumber: z
    .string()
    .optional()
    .refine((value) => !value || /^\+?[1-9]\d{1,14}$/.test(value), {
      message: 'Invalid phone number format',
    }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .or(z.literal(''))
    .optional(),
});

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>;
