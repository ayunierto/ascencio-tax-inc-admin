import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserResponse } from "../interfaces/user.response";
import { deleteUserAction } from "../actions/delete-user.action";
import { User } from "../schemas/user.schema";
import { ServerException } from "@/interfaces/server-exception.response";
import { createUpdateUserAction } from "../actions/create-update-user.action";
import { UsersResponse } from "../interfaces/users.response";

export const useMutations = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    UserResponse,
    AxiosError<ServerException>,
    Partial<User>
  >({
    mutationFn: createUpdateUserAction,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["user", response.id], response);

      queryClient.setQueryData(
        ["users"],
        (oldList: UsersResponse): UsersResponse => {
          if (!oldList) return { users: [response], count: 1, pages: 1 };

          if (!oldList.users.find((user) => user.id === response.id)) {
            return {
              ...oldList,
              users: [...oldList.users, response],
            };
          }

          return {
            ...oldList,
            users: oldList.users.map((s) =>
              s.id === response.id ? response : s
            ),
          };
        }
      );
    },
  });

  const deleteMutation = useMutation<
    UserResponse,
    AxiosError<ServerException>,
    string,
    unknown
  >({
    mutationFn: deleteUserAction,
    onSuccess: (_data, id) => {
      queryClient.setQueryData(
        ["users"],
        (oldList: UsersResponse): UsersResponse => {
          if (!oldList) return { users: [], count: 0, pages: 0 };
          return {
            ...oldList,
            users: oldList.users.filter((user) => user.id !== id),
          };
        }
      );

      queryClient.removeQueries({ queryKey: ["user", id] });
    },
  });

  return { mutation, deleteMutation };
};
