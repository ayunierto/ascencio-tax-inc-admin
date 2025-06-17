export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  countryCode?: string;
  phoneNumber: string;
  password: string;
  birthdate?: string;
  isActive: boolean;
  lastLogin?: string;
  roles: string[];
  verificationCode?: string;
  verificationCodeExpiresAt?: string;
  passwordResetCode?: string;
  passwordResetExpiresAt?: string;
  createdAt: string;
  updatedAt?: string;
}
