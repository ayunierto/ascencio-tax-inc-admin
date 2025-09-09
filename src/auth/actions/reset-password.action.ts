import { api } from "@/api/api";
import { ResetPasswordResponse } from "../interfaces";
import { ResetPasswordRequest } from "../schemas";

export const resetPasswordAction = async ({
  code,
  email,
  newPassword,
}: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  try {
    const { data } = await api.post<ResetPasswordResponse>(
      "auth/reset-password",
      { code, email, newPassword }
    );

    return data;
  } catch (error) {
    throw error;
  }
};
