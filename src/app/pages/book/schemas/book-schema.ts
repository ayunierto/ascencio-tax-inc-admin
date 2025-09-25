import z from "zod";

export const bookSchema = z.object({
  serviceId: z.string().uuid({ message: "Invalid service ID format" }),
  staffId: z.string().uuid({ message: "Invalid staff ID format" }),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format" }),
  time: z.string().regex(/^\d{2}:\d{2}$/, { message: "Invalid time format" }),
  timeZone: z.string().min(2).max(100),
  comments: z.string().optional(),
});

export type BookFormValues = z.infer<typeof bookSchema>;
