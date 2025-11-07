import z from 'zod';

export const updateSettingsSchema = z.object({
  timeZone: z.string().min(1, 'Time zone is required'),
  locale: z.string().min(1, 'Locale is required'),
});

export type UpdateSettingsFormFields = z.infer<typeof updateSettingsSchema>;
