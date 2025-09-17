import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUpdateScheduleAction } from "../actions/create-update-schedule.action";
import { ScheduleResponse } from "../interfaces/schedules.response";
import { ServerException } from "@/interfaces/server-exception.response";
import { Schedule } from "../schemas/schedule.schema";
import { deleteScheduleAction } from "../actions/delete-schedule.action";

export const useMutations = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ScheduleResponse,
    AxiosError<ServerException>,
    Partial<Schedule>
  >({
    mutationFn: createUpdateScheduleAction,
    onSuccess: (updatedSchedule) => {
      // Update data
      queryClient.setQueryData(
        ["schedule", updatedSchedule.id],
        updatedSchedule
      );

      // Update list
      queryClient.setQueryData(["schedules"], (oldList: ScheduleResponse[]) => {
        // If no old list, return a new list with the updated schedule
        if (!oldList) return [updatedSchedule];
        // If the schedule is not in the list, add it
        if (!oldList.find((s) => s.id === updatedSchedule.id)) {
          return [...oldList, updatedSchedule];
        }
        // Otherwise, update the existing schedule
        return oldList.map((s) =>
          s.id === updatedSchedule.id ? updatedSchedule : s
        );
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteScheduleAction,
    onSuccess: (_data, id) => {
      // Update list
      queryClient.setQueryData(["schedules"], (oldList: ScheduleResponse[]) => {
        if (!oldList) return [];
        return oldList.filter((s) => s.id !== id);
      });
      // Remove individual schedule query
      queryClient.removeQueries({ queryKey: ["schedule", id] });
    },
  });

  return {
    mutation,
    deleteMutation,
  };
};
