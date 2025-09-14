"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResetPasswordRequest, resetPasswordSchema } from "@/auth/schemas";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { toast } from "sonner";
import EmptyContent from "@/components/EmptyContent";
import { CircleX } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ResetPasswordResponse } from "@/auth/interfaces";
import { AxiosError } from "axios";
import { ServerException } from "@/interfaces/server-exception.response";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { resetPassword, tempEmail } = useAuthStore();

  if (!tempEmail) {
    return (
      <EmptyContent
        title="No email found"
        description="Please start the password reset process again."
        icon={<CircleX size={48} />}
        action={
          <Button variant="outline" asChild>
            <Link to="/auth/forgot-password">Go back</Link>
          </Button>
        }
      />
    );
  }

  const resetPasswordForm = useForm<ResetPasswordRequest>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: tempEmail || "",
      code: "",
      newPassword: "",
    },
  });

  const resetPasswordMutation = useMutation<
    ResetPasswordResponse,
    AxiosError<ServerException>,
    ResetPasswordRequest
  >({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successful", {
        description: "You can now log in with your new password.",
        duration: 8000,
      });
      resetPasswordForm.reset();
      navigate("/auth/signin"); // redirige al login después de resetear la contraseña
    },
    onError: (error) => {
      resetPasswordForm.reset({ code: "", newPassword: "" });
      resetPasswordForm.setFocus("code");
      toast.error("Error resetting password", {
        description: error.response?.data.message || "Please try again.",
        duration: 8000,
      });
    },
  });

  const onSubmit = (data: ResetPasswordRequest) => {
    resetPasswordMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center bg-muted/20">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...resetPasswordForm}>
            <form
              onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Email */}
              <FormField
                control={resetPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Code */}
              <FormField
                control={resetPasswordForm.control}
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

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={resetPasswordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter new password"
                        type="password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={resetPasswordMutation.isPending}
                loading={resetPasswordMutation.isPending}
              >
                {resetPasswordMutation.isPending
                  ? "Resetting..."
                  : "Reset Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
