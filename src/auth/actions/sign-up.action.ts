import { api } from "@/api/api";
import { SignUpApiRequest } from "../schemas";
import type { SignUpResponse } from "../interfaces/sign-up.response";

export const signUpAction = async (
  newUser: SignUpApiRequest
): Promise<SignUpResponse> => {
  newUser.email = newUser.email.toLocaleLowerCase().trim();

  try {
    const { data } = await api.post<SignUpResponse>("/auth/signup", newUser);
    return data;
  } catch (error) {
    throw error;
  }
};
