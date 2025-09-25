import z from "zod";

export const scheduleSchema = z
  .object({
    id: z.string(),
    dayOfWeek: z.number({ required_error: "Weekday is required" }), // 0 (Sunday) to 6 (Saturday)
    startTime: z
      .string({ required_error: "The start time field is required" })
      .regex(
        /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Invalid start time format, use HH:MM"
      ),
    endTime: z
      .string({ required_error: "The end time field is required" })
      .regex(
        /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        "Invalid end time format, use HH:MM"
      ),
  })
  .refine(
    // Custom validation to ensure endTime is after startTime
    (data) => {
      // Create date objects for comparison
      const start = new Date(`1970-01-01T${data.startTime}:00`);
      const end = new Date(`1970-01-01T${data.endTime}:00`);

      // Check if the end time is less than the start time
      return end > start;
    },
    {
      message:
        "The end time cannot be earlier than or equal to the start time.",
      path: ["endTime"], // The field where the error should be displayed
    }
  );

export type Schedule = z.infer<typeof scheduleSchema>;
