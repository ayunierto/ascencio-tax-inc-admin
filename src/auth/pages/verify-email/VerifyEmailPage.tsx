import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CircleX, LogIn } from "lucide-react";
import { VerifyCodeResponse } from "@/auth/interfaces";
import { VerifyCodeRequest, verifyCodeSchema } from "@/auth/schemas";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";
import { ServerException } from "@/interfaces/server-exception.response";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const VerifyEmailPage = () => {
  const { verifyCode, tempEmail } = useAuthStore();
  const navigate = useNavigate();

  const verifyCodeForm = useForm<VerifyCodeRequest>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      email: tempEmail || "",
      code: "",
    },
  });

  const verifyCodeMutation = useMutation<
    VerifyCodeResponse,
    AxiosError<ServerException>,
    VerifyCodeRequest
  >({
    mutationFn: verifyCode,
    onSuccess: async (data) => {
      verifyCodeForm.reset();
      toast.success("Verification code sent", {
        icon: <LogIn size={18} />,
        description: `Welcome ${data.user
          .firstName!}, please verify your email.`,
      });
    },
    onError(error) {
      toast.error("Sign up failed", {
        description:
          error.response?.data.message ||
          "Please check your details and try again.",
        dismissible: false,
        icon: <CircleX size={18} />,
      });
    },
  });

  const handleVerifyEmail = async (values: VerifyCodeRequest) => {
    await verifyCodeMutation.mutateAsync(values);
    navigate("/auth/signin");
    return;
  };
  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="w-full sm:max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Confirm your email</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email to verify your address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...verifyCodeForm}>
            <form onSubmit={verifyCodeForm.handleSubmit(handleVerifyEmail)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <FormField
                    control={verifyCodeForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Verification Code</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormDescription>
                          Please enter the code sent to your email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-end">
                    <Button
                      loading={verifyCodeMutation.isPending}
                      disabled={verifyCodeMutation.isPending}
                      type="submit"
                    >
                      Verify Email
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
