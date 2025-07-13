import { z } from 'zod';

export const createScheduleSchema = z.object({
  weekday: z.number(),
  startTime: z.string(),
  endTime: z.string(),
});

export const updateScheduleSchema = createScheduleSchema.extend({
  id: z.string().uuid(),
});

export type CreateScheduleRequest = z.ZodType<typeof createScheduleSchema>;
export type UpdateScheduleRequest = z.infer<typeof updateScheduleSchema>;
