import { HttpError } from '@/adapters/http/http-client.interface';
import { BasicUser } from './user.interface';

export interface UserTokenResponse {
  access_token: string;
  user: BasicUser;
}

export interface UserMessageResponse {
  message: string;
  user: BasicUser;
}

export interface OnlyMessageResponse {
  message: string;
  statusCode?: number;
  error?: string;
}

export type SignUpResponse = UserMessageResponse | HttpError;
export type VerifyEmailCodeResponse = UserMessageResponse | HttpError;
export type ResendEmailVerificationResponse = OnlyMessageResponse | HttpError;
export type SignInResponse = UserTokenResponse | HttpError;
export type ForgotPasswordResponse = OnlyMessageResponse | HttpError;
export type ResetPasswordResponse = OnlyMessageResponse | HttpError;
export type CheckStatusResponse = UserTokenResponse | HttpError;
export type ResendResetPasswordCodeResponse = OnlyMessageResponse | HttpError;
export type ChangePasswordResponse = UserMessageResponse | HttpError;
export type DeleteAccountResponse = UserMessageResponse | HttpError;
export type UpdateProfileResponse = UserMessageResponse | HttpError;
