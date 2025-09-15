import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "../store/useAuthStore";
import { AuthResponse } from "../interfaces";
import { AlertCircleIcon, CircleX, LogIn } from "lucide-react";
import { SignInRequest, signInSchema } from "../schemas";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ServerException } from "@/interfaces/server-exception.response";
import { resendCode } from "../actions/resend-code.action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DateTime } from "luxon";

export const SignInForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { signIn, tempEmail } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<SignInRequest>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: tempEmail || "",
      password: "",
    },
  });

  const mutation = useMutation<
    AuthResponse,
    AxiosError<ServerException>,
    SignInRequest
  >({
    mutationFn: signIn,
    onSuccess: async (data) => {
      form.reset();
      toast.success("Login successful", {
        icon: <LogIn size={18} />,
        description: `Last login: ${DateTime.fromISO(
          data.user.lastLoginAt
        ).toLocaleString(DateTime.DATETIME_MED)}`,
        duration: 8000,
        dismissible: true,
      });
      if (data.user.roles.includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
    async onError(error, variables) {
      if (error.message === "Network Error") {
        toast.error("Network Error", {
          description: "Please check your internet connection and try again.",
        });
        return;
      }

      if (error.response?.data.error === "Email Not Verified") {
        await resendCode(variables.email);
        navigate("/auth/verify-email");
      }

      form.setError("root", {
        message:
          error.response?.data.message ||
          "Incorrect email or password. Please try again.",
      });

      toast.error("Login failed", {
        description:
          error.response?.data.message ||
          "Incorrect email or password. Please try again.",
        dismissible: false,
        icon: <CircleX size={18} />,
        duration: 5000,
      });
    },
  });

  const onSubmit = async (values: SignInRequest) => {
    await mutation.mutateAsync(values);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center justify-center",
        className
      )}
      {...props}
    >
      <Card className="max-w-sm w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign In</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {form.formState.errors.root && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Sign in failed</AlertTitle>
              <AlertDescription>
                <p className="text-xs">
                  Please verify your information and try again.
                </p>
                <ul className="list-inside list-disc text-xs">
                  <li>{form.formState.errors.root.message}</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          to="/auth/forgot-password"
                          className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          required
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                  loading={mutation.isPending}
                >
                  Login
                </Button>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to={"/auth/signup"}
                    className="underline underline-offset-4 font-bold text-primary hover:text-primary/80"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};
