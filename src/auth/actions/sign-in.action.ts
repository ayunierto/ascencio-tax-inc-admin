import { api } from "@/api/api";
import { AuthResponse } from "../interfaces";
import { SignInRequest } from "../schemas";

export const signInAction = async (
  credentials: SignInRequest
): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>("/auth/signin", credentials);
    return data;
  } catch (error) {
    throw error;
  }
};
