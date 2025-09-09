import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string({ message: "The name is required" })
      .min(3, "First name must be at least 3 characters"),
    lastName: z
      .string({ message: "The last name is required" })
      .min(3, "First name must be at least 3 characters"),
    email: z
      .string({ message: "The email is required" })
      .email("Invalid email address"),
    countryCode: z.string().optional(),
    phoneNumber: z.string().optional(),
    locale: z.string().optional(),
    password: z
      .string({ message: "The password is required" })
      .min(6, "Password must be at least 6 characters"),
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_])[A-Za-z\d!@#$%^&*(),.?":{}|<>_]{8,}$/,
    //   'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
    // ),
    confirmPassword: z
      .string({ message: "The confirm password is required" })
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignUpRequest = z.infer<typeof signUpSchema>;

export type SignUpApiRequest = Omit<SignUpRequest, "confirmPassword">;
