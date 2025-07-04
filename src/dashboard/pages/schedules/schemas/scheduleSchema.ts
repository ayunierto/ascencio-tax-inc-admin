import { z } from 'zod';

export const createScheduleSchema = z.object({
  weekday: z.number(),
  startTime: z.string(),
  endTime: z.string(),
});

export const updateScheduleSchema = createScheduleSchema.extend({
  id: z.string().uuid(),
});

export type CreateScheduleInputs = z.ZodType<typeof createScheduleSchema>;
export type UpdateScheduleInputs = z.infer<typeof updateScheduleSchema>;
