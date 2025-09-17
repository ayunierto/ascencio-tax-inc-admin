import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { StaffResponse } from "../interfaces/staff.response";
import { deleteStaffMemberAction } from "../actions/delete-staff-member.action";
import { Staff } from "../schemas/staff.schema";
import { ServerException } from "@/interfaces/server-exception.response";
import { createUpdateStaffMemberAction } from "../actions/create-update-staff-member.action";

export const useMutations = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    StaffResponse,
    AxiosError<ServerException>,
    Partial<Staff>
  >({
    mutationFn: createUpdateStaffMemberAction,
    onSuccess: (updatedStaff) => {
      // Update data
      queryClient.setQueryData(["staff", updatedStaff.id], updatedStaff);

      // Update list
      queryClient.setQueryData(["staff"], (oldList: StaffResponse[]) => {
        // If no old list, return a new list with the updated staff
        if (!oldList) return [updatedStaff];
        // If the staff is not in the list, add it
        if (!oldList.find((staff) => staff.id === updatedStaff.id)) {
          return [...oldList, updatedStaff];
        }
        // Otherwise, update the existing staff
        return oldList.map((s) =>
          s.id === updatedStaff.id ? updatedStaff : s
        );
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStaffMemberAction,
    onSuccess: (_data, id) => {
      // Update list
      queryClient.setQueryData(["staff"], (oldList: StaffResponse[]) => {
        if (!oldList) return [];
        return oldList.filter((s) => s.id !== id);
      });
      // Remove individual staff query
      queryClient.removeQueries({ queryKey: ["staff", id] });
    },
  });

  return { mutation, deleteMutation };
};
