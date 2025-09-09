import { api } from "@/api/api";

export const resendCode = async (email: string) => {
  try {
    const { data } = await api.post("/auth/resend-email-code", {
      email: email.toLocaleLowerCase().trim(),
    });

    return data;
  } catch (error) {
    throw error;
  }
};
