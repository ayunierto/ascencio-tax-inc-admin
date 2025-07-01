export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countryCode?: string;
  phoneNumber?: string;
  locale?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResendEmailVerificationCodeRequest {
  email: string;
}

export interface ResendResetPasswordCodeRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface VerifyEmailCodeRequest {
  code: string;
  email: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  countryCode?: string;
  phoneNumber?: string;
  password?: string;
}

export interface DeleteAccountRequest {
  password: string;
}
