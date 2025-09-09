import { api } from "@/api/api";
import { VerifyCodeResponse } from "../interfaces";
import { VerifyCodeRequest } from "../schemas";

export const verifyCodeAction = async ({
  code,
  email,
}: VerifyCodeRequest): Promise<VerifyCodeResponse> => {
  try {
    const { data } = await api.post<VerifyCodeResponse>(
      "/auth/verify-email-code",
      {
        code,
        email,
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};
