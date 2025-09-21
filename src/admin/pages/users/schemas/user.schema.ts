import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string().min(3, "First name must have at least 3 characters"),
  lastName: z.string().min(3, "Last name must have at least 3 characters"),
  email: z.string().email("Invalid email address"),
  imageUrl: z.string().url("Invalid image URL").optional(),
  password: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.length >= 6, {
      message: "Password must have at least 6 characters",
    }),
  countryCode: z.string().optional(),

  phoneNumber: z.string().optional(),
  locale: z.string().optional(),

  isActive: z.boolean(),
  roles: z.array(z.string()).min(1, "At least one role must be assigned"),
  isEmailVerified: z.boolean(),
  // Transient field for file upload. Not stored in the database.
  imageFile: z.instanceof(File).optional(),
});

export type User = z.infer<typeof userSchema>;
