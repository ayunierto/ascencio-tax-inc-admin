import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/useAuthStore";
import { SignUpApiRequest, SignUpRequest, signUpSchema } from "../schemas";
import { useMutation } from "@tanstack/react-query";
import { SignUpResponse } from "../interfaces";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { CircleX, LogIn } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ServerException } from "@/interfaces/server-exception.response";

export const SignUpForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { signUp } = useAuthStore();
  const navigate = useNavigate();

  const signUpForm = useForm<SignUpRequest>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      countryCode: "",
      confirmPassword: "",
    },
  });

  const signUpMutation = useMutation<
    SignUpResponse,
    AxiosError<ServerException>,
    SignUpApiRequest
  >({
    mutationFn: signUp,
    onSuccess: async (data) => {
      signUpForm.reset();
      toast.success("Sign up successful", {
        icon: <LogIn size={18} />,
        description: `${data.user
          .firstName!}, please verify your email. A verification code has been sent to ${
          data.user.email
        }.`,
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

  const handleSignUp = async (values: SignUpRequest) => {
    const { confirmPassword, ...rest } = values;
    await signUpMutation.mutateAsync(rest);
    navigate("/auth/verify-email");
    return;
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="max-w-lg sm:max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Create an account
          </CardTitle>
          {/* <CardDescription>Enter your details below</CardDescription> */}
        </CardHeader>
        <CardContent>
          <Form {...signUpForm}>
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-6 sm:grid-cols-2 sm:gap-3">
                    <FormField
                      control={signUpForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="firstName">First Name</FormLabel>
                          <FormControl>
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="John"
                              required
                              autoComplete="given-name"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signUpForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="lastName">Last Name</FormLabel>
                          <FormControl>
                            <Input
                              id="lastName"
                              type="text"
                              placeholder="Doe"
                              required
                              autoComplete="family-name"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={signUpForm.control}
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
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-row gap-3">
                    <FormField
                      control={signUpForm.control}
                      name="countryCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="countryCode">
                            Country Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="countryCode"
                              type="text"
                              placeholder="+1"
                              autoComplete="country"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signUpForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="phoneNumber">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="phoneNumber"
                              type="text"
                              placeholder="123-456-7890"
                              autoComplete="tel"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-6 sm:flex-row sm:gap-3">
                    <FormField
                      control={signUpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              placeholder="••••••••"
                              required
                              autoComplete="new-password"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signUpForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="confirmPassword">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="••••••••"
                              required
                              autoComplete="new-password"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    loading={signUpMutation.isPending}
                    disabled={signUpMutation.isPending}
                    type="submit"
                    className="w-full"
                    variant={"outline"}
                  >
                    Register
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/auth/signin"
                    className="underline underline-offset-4 font-bold text-primary hover:text-primary/80"
                  >
                    Sign in
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
