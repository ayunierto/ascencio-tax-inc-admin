import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Link, useNavigate } from "react-router";
import { ForgotPasswordRequest, forgotPasswordSchema } from "@/auth/schemas";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword } = useAuthStore();

  const forgotPasswordForm = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      forgotPasswordForm.reset();
      toast.success("Verification code sent to your email", {
        description:
          "Please check your email for the verification code to reset your password.",
        duration: 8000,
      });

      navigate("/auth/password-reset");
    },
    onError: (error) => {
      console.error("Error sending code:", error);
      toast.error("Error sending verification code", {
        description: "Please try again later.",
      });
    },
  });

  const handleForgotPasswordSubmit = async (data: ForgotPasswordRequest) => {
    try {
      await forgotPasswordMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error sending code", error);
    }
  };

  return (
    <div className="flex items-center justify-center  bg-muted/20">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...forgotPasswordForm}>
            <form
              onSubmit={forgotPasswordForm.handleSubmit(
                handleForgotPasswordSubmit
              )}
              className="space-y-6"
            >
              <FormField
                control={forgotPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        autoComplete="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={forgotPasswordMutation.isPending}
                  loading={forgotPasswordMutation.isPending}
                >
                  {forgotPasswordMutation.isPending
                    ? "Sending..."
                    : "Send code"}
                </Button>
                <Button
                  type="button"
                  className="w-full"
                  variant="outline"
                  disabled={forgotPasswordMutation.isPending}
                  asChild
                >
                  <Link to="/auth/signin">
                    {" "}
                    <ArrowLeft /> Back to Sign In
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
