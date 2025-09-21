import { Role } from "./role.enum";

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  email: string;
  password: string;
  countryCode?: string;
  phoneNumber?: string;
  locale?: string;
  isActive: boolean;
  roles: Role[];
  isEmailVerified: boolean;
  verificationCode?: string;
  verificationCodeExpiresAt?: string;
  passwordResetCode?: string;
  passwordResetExpiresAt?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}
