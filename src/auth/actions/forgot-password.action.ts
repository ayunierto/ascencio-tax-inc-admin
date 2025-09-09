import { api } from "@/api/api";
import { ForgotPasswordResponse } from "../interfaces";
import { ForgotPasswordRequest } from "../schemas";

export const forgotPasswordAction = async ({
  email,
}: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
  try {
    const { data } = await api.post<ForgotPasswordResponse>(
      "/auth/forgot-password",
      { email }
    );

    return data;
  } catch (error) {
    throw error;
  }
};
