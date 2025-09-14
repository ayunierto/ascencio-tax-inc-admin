import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { resendCode } from "../actions/resend-code.action";
import { ServerException } from "@/interfaces/server-exception.response";

export const ResendEmailCodeMutation = () => {
  return useMutation<string, AxiosError<ServerException>, string>({
    mutationFn: resendCode,
  });
};
