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
} from "@/components/ui/form";
import { ServerException } from "@/interfaces/server-exception.response";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import EmptyContent from "@/components/EmptyContent";
import { ResendEmailCodeMutation } from "@/auth/mutations/resend-email-code.mutation";
import { useCountdown } from "@/hooks/useCountdown";

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { verifyCode, tempEmail } = useAuthStore();
  const { seconds, isActive, start } = useCountdown(30);

  if (!tempEmail) {
    return (
      <EmptyContent
        icon={<CircleX size={48} />}
        title="No email found"
        description="Please provide a valid email to verify."
      />
    );
  }

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
      toast.success("Verification successful", {
        icon: <LogIn size={18} />,
        description: `Thank you ${data.user
          .firstName!}, please sign in to your account.`,
      });
    },
    onError(error) {
      toast.error("Verification failed", {
        description:
          error.response?.data.message ||
          "Please check your details and try again.",
        dismissible: false,
        icon: <CircleX size={18} />,
      });
    },
  });

  const handleVerifyEmail = async (values: VerifyCodeRequest) => {
    if (!tempEmail) {
      toast.error("No email found to verify.");
      return;
    }
    await verifyCodeMutation.mutateAsync(values);
    navigate("/auth/signin");
    return;
  };

  const resendCodeMutation = ResendEmailCodeMutation();

  const handleResendCode = async (): Promise<void> => {
    if (!tempEmail) {
      toast.error("No email found to resend code.");
      return;
    }
    try {
      await resendCodeMutation.mutateAsync(tempEmail);
      toast.success("Verification code resent to your email.", {
        description: "Please check your inbox.",
      });
    } catch (error: any) {
      toast.error("Failed to resend code.", {
        description: error?.response?.data?.message || "Please try again.",
        icon: <CircleX size={18} />,
      });
    } finally {
      start();
    }
  };

  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="w-full sm:max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Verify your code
          </CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email to verify your address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...verifyCodeForm}>
            <form onSubmit={verifyCodeForm.handleSubmit(handleVerifyEmail)}>
              <div className="flex flex-col justify-center items-center gap-6">
                <div className="flex flex-col justify-center items-center gap-3">
                  <FormField
                    control={verifyCodeForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center">
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

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-end">
                    <Button
                      loading={verifyCodeMutation.isPending}
                      disabled={
                        verifyCodeMutation.isPending ||
                        resendCodeMutation.isPending
                      }
                      type="submit"
                    >
                      Verify Email
                    </Button>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      {"Didn’t receive the code?"}
                    </p>

                    <Button
                      variant={"outline"}
                      type="button"
                      onClick={handleResendCode}
                      // loading={resendCodeMutation.isPending}
                      disabled={
                        resendCodeMutation.isPending ||
                        verifyCodeMutation.isPending ||
                        isActive
                      }
                    >
                      {isActive ? (
                        <span className="text-sm text-center text-muted-foreground">
                          You can resend the code in {seconds} seconds
                        </span>
                      ) : resendCodeMutation.isPending ? (
                        "Resending..."
                      ) : (
                        "Resend Code"
                      )}
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
