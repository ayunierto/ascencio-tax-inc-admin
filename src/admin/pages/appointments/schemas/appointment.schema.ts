import z from 'zod';

export const appointmentSchema = z.object({
  id: z.string({ required_error: 'ID is required.' }),
  serviceId: z.string().uuid({ message: 'Service must be a valid.' }),
  staffId: z.string().uuid({ message: 'Staff must be a valid.' }),
  start: z
    .string()
    .datetime({ message: 'Start date must be in ISO8601 format.' }),
  end: z.string().datetime({ message: 'End date must be in ISO8601 format.' }),
  timeZone: z.string().refine(
    (val) => {
      try {
        Intl.DateTimeFormat(undefined, { timeZone: val });
        return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        return false;
      }
    },
    {
      message: 'The provided timeZone is not a valid IANA time zone identifier',
    }
  ),
  comments: z.string().optional(),
});

export type AppointmentFormFields = z.infer<typeof appointmentSchema>;
