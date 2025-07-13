import { httpClient } from '@/adapters/http/httpClient.adapter';
import {
  ChangePasswordResponse,
  CheckStatusResponse,
  DeleteAccountResponse,
  ForgotPasswordResponse,
  ResendEmailCodeResponse,
  ResendResetPasswordCodeResponse,
  ResetPasswordResponse,
  SignInResponse,
  SignUpResponse,
  UpdateProfileResponse,
  VerifyEmailCodeResponse,
} from '../interfaces';
import {
  ChangePasswordRequest,
  DeleteAccountRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  SignInRequest,
  SignUpRequest,
  UpdateProfileRequest,
  VerifyEmailCodeRequest,
} from '../schemas';
import { handleApiErrors } from '../utils';

interface AuthServiceInterface {
  signUp(newUser: SignUpRequest): Promise<SignUpResponse>;
  signIn(credentials: SignInRequest): Promise<SignInResponse>;
  verifyEmailCode(
    verifyEmailCodeRequest: VerifyEmailCodeRequest
  ): Promise<VerifyEmailCodeResponse>;
  forgotPassword(
    forgotPasswordRequest: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse>;
  changePassword(
    changePasswordRequest: ChangePasswordRequest
  ): Promise<ChangePasswordResponse>;
  checkStatus(): Promise<CheckStatusResponse>;
  deleteAccount(
    deleteAccountRequest: DeleteAccountRequest
  ): Promise<DeleteAccountResponse>;
  resendEmailCode(resendEmailCodeRequest: {
    email: string;
  }): Promise<ResendEmailCodeResponse>;
  resetPassword(
    resetPasswordRequest: ResetPasswordRequest
  ): Promise<ResetPasswordResponse>;
  resendResetPasswordCode(resendResetPasswordCodeRequest: {
    email: string;
  }): Promise<ResendEmailCodeResponse>;
  updateProfile(
    updateProfileRequest: UpdateProfileRequest
  ): Promise<UpdateProfileResponse>;
}

export class AuthService implements AuthServiceInterface {
  /**
   * Sign up a new user.
   * @param newUser - The new user data.
   * @return A promise that resolves to the sign-up response.
   * @throws An error if the sign-up fails.
   */
  public async signUp(newUser: SignUpRequest): Promise<SignUpResponse> {
    newUser.email = newUser.email.toLocaleLowerCase().trim();
    try {
      return await httpClient.post<SignUpResponse>('auth/signup', {
        body: newUser,
      });
    } catch (error) {
      return handleApiErrors(error, 'SignUp');
    }
  }

  /**
   * Verify the email code for a user.
   * @param code - The verification code.
   * @param email - The user's email.
   * @return A promise that resolves to the verification response.
   * @throws An error if the verification fails.
   */
  public async verifyEmailCode(
    verifyEmailCodeRequest: VerifyEmailCodeRequest
  ): Promise<VerifyEmailCodeResponse> {
    try {
      return await httpClient.post<VerifyEmailCodeResponse>(
        'auth/verify-email',
        {
          body: verifyEmailCodeRequest,
        }
      );
    } catch (error) {
      return handleApiErrors(error, 'VerifyEmailCode');
    }
  }

  /**
   * Sign in an existing user.
   * @param credentials - The user's credentials.
   * @return A promise that resolves to the sign-in response.
   * @throws An error if the sign-in fails.
   */
  public async signIn(credentials: SignInRequest): Promise<SignInResponse> {
    try {
      return await httpClient.post<SignInResponse>('auth/signin', {
        body: credentials,
      });
    } catch (error) {
      return handleApiErrors(error, 'SignIn');
    }
  }

  /**
   * Request a password reset for a user.
   * @param forgotPasswordRequest - The request containing the user's email.
   * @return A promise that resolves to the forgot password response.
   * @throws An error if the request fails.
   */
  public async forgotPassword(
    forgotPasswordRequest: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    try {
      return await httpClient.post<ForgotPasswordResponse>(
        'auth/forgot-password',
        {
          body: forgotPasswordRequest,
        }
      );
    } catch (error) {
      return handleApiErrors(error, 'ForgotPassword');
    }
  }

  /**
   * Change the password for a user.
   * @param changePasswordRequest - The request containing the current and new passwords.
   * @return A promise that resolves to the change password response.
   * @throws An error if the change password fails.
   */
  public async changePassword(
    changePasswordRequest: ChangePasswordRequest
  ): Promise<ChangePasswordResponse> {
    try {
      return await httpClient.post<ChangePasswordResponse>(
        'auth/change-password',
        {
          body: changePasswordRequest,
        }
      );
    } catch (error) {
      return handleApiErrors(error, 'ChangePassword');
    }
  }

  /**
   * Check the authentication status of the user.
   * @return A promise that resolves to the check status response.
   * @throws An error if the check status fails.
   */
  public async checkStatus(): Promise<CheckStatusResponse> {
    try {
      return await httpClient.get<CheckStatusResponse>('auth/check-status');
    } catch (error) {
      return handleApiErrors(error, 'CheckStatus');
    }
  }

  /**
   * Delete a user account.
   * @param deleteAccountRequest - The request containing the user's email and password.
   * @return A promise that resolves to the delete account response.
   * @throws An error if the delete account fails.
   */
  public async deleteAccount(
    deleteAccountRequest: DeleteAccountRequest
  ): Promise<DeleteAccountResponse> {
    try {
      return await httpClient.post<DeleteAccountResponse>(
        'auth/delete-account',
        {
          body: deleteAccountRequest,
        }
      );
    } catch (error) {
      return handleApiErrors(error, 'DeleteAccount');
    }
  }

  /**
   * Resend the email verification code to the user.
   * @param resendEmailCodeRequest - The request containing the user's email.
   * @return A promise that resolves to the resend email code response.
   * @throws An error if the resend email code fails.
   */
  public async resendEmailCode(resendEmailCodeRequest: {
    email: string;
  }): Promise<ResendEmailCodeResponse> {
    try {
      return await httpClient.post<ResendEmailCodeResponse>(
        'auth/resend-email-code',
        {
          body: resendEmailCodeRequest,
        }
      );
    } catch (error) {
      return handleApiErrors(error, 'ResendEmailCode');
    }
  }

  /**
   * Reset the user's password.
   * @param resetPasswordRequest - The request containing the user's email, code, and new password.
   * @return A promise that resolves to the reset password response.
   * @throws An error if the reset password fails.
   */
  public async resetPassword(
    resetPasswordRequest: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    try {
      return await httpClient.post<ResetPasswordResponse>(
        'auth/reset-password',
        {
          body: resetPasswordRequest,
        }
      );
    } catch (error) {
      return handleApiErrors(error, 'ResetPassword');
    }
  }

  /**
   * Resend the reset password code to the user.
   * @param resendResetPasswordCodeRequest - The request containing the user's email.
   * @return A promise that resolves to the resend reset password code response.
   * @throws An error if the resend reset password code fails.
   */
  public async resendResetPasswordCode(resendResetPasswordCodeRequest: {
    email: string;
  }): Promise<ResendResetPasswordCodeResponse> {
    try {
      return await httpClient.post<ResendResetPasswordCodeResponse>(
        'auth/resend-reset-password-code',
        {
          body: resendResetPasswordCodeRequest,
        }
      );
    } catch (error) {
      return handleApiErrors(error, 'ResendResetPasswordCode');
    }
  }

  /**
   * Update the user's profile.
   * @param updateProfileRequest - The request containing the user's profile data.
   * @return A promise that resolves to the update profile response.
   * @throws An error if the update profile fails.
   */
  public async updateProfile(
    updateProfileRequest: UpdateProfileRequest
  ): Promise<UpdateProfileResponse> {
    try {
      return await httpClient.post<UpdateProfileResponse>(
        'auth/update-profile',
        {
          body: updateProfileRequest,
        }
      );
    } catch (error) {
      return handleApiErrors(error, 'UpdateProfile');
    }
  }
}

export const authService = new AuthService();
