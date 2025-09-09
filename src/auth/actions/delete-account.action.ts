import { api } from "@/api/api";
import { DeleteAccountResponse } from "../interfaces";
import { DeleteAccountRequest } from "../schemas";

export const deleteAccountAction = async ({
  password,
}: DeleteAccountRequest): Promise<DeleteAccountResponse> => {
  try {
    const { data } = await api.post<DeleteAccountResponse>(
      "/auth/delete-account",
      { password }
    );

    return data;
  } catch (error) {
    throw error;
  }
};
