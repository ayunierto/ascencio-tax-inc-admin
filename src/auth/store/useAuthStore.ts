import { create } from 'zustand';

import {
  SignUpResponse,
  VerifyEmailCodeResponse,
  SignInResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  DeleteAccountResponse,
  BasicUser,
  CheckStatusResponse,
  UpdateProfileResponse,
} from '../interfaces';
import { storageAdapter } from '@/adapters/StorageAdapter';
import { authService } from '../services/AuthService';
import {
  DeleteAccountRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  SignInRequest,
  SignUpRequest,
  UpdateProfileRequest,
  VerifyEmailCodeRequest,
} from '../schemas';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
  status: AuthStatus;
  access_token?: string;
  user?: BasicUser;

  signUp: (values: SignUpRequest) => Promise<SignUpResponse>;
  verifyEmailCode: (
    data: VerifyEmailCodeRequest
  ) => Promise<VerifyEmailCodeResponse>;
  signIn: (credentials: SignInRequest) => Promise<SignInResponse>;
  checkStatus: () => Promise<CheckStatusResponse>;
  deleteAccount: (data: DeleteAccountRequest) => Promise<DeleteAccountResponse>;
  logout: () => Promise<void>;
  setAuthenticated: (access_token: string, user: BasicUser) => void;
  setUnauthenticated: () => void;
  forgotPassword: (
    data: ForgotPasswordRequest
  ) => Promise<ForgotPasswordResponse>;
  resetPassword: (data: ResetPasswordRequest) => Promise<ResetPasswordResponse>;
  updateProfile: (data: UpdateProfileRequest) => Promise<UpdateProfileResponse>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  access_token: undefined,
  user: undefined,

  signUp: async (data: SignUpRequest) => {
    const response = await authService.signUp(data);
    if ('user' in response) {
      set({ user: response.user });
    }
    return response;
  },

  verifyEmailCode: async (data: VerifyEmailCodeRequest) => {
    const response = await authService.verifyEmailCode(data);
    return response;
  },

  signIn: async (credentials: SignInRequest) => {
    const response = await authService.signIn(credentials);

    if ('access_token' in response) {
      await storageAdapter.setAccessToken(response.access_token);
      get().setAuthenticated(response.access_token, response.user);
      return response;
    }

    return response;
  },

  updateProfile: async (data: UpdateProfileRequest) => {
    const response = await authService.updateProfile(data);
    if ('user' in response) {
      set({ user: response.user });
    }
    return response;
  },

  deleteAccount: async (data: DeleteAccountRequest) => {
    const response = await authService.deleteAccount(data);

    if ('error' in response) {
      return response;
    }

    await storageAdapter.removeAccessToken();
    get().setUnauthenticated();
    return response;
  },

  checkStatus: async () => {
    const response = await authService.checkStatus();

    if ('access_token' in response) {
      await storageAdapter.setAccessToken(response.access_token);
      get().setAuthenticated(response.access_token, response.user);
      return response;
    }

    get().setUnauthenticated();
    if (response.error === 'Network Error') {
      set({ status: 'checking' });
      console.warn('Network Error');
    }
    return response;
  },

  logout: async () => {
    await storageAdapter.removeAccessToken();
    get().setUnauthenticated();
  },

  forgotPassword: async (data: ForgotPasswordRequest) => {
    const response = await authService.forgotPassword(data);
    set({
      user: {
        email: data.email,
        createdAt: new Date(),
        id: '',
        lastName: '',
        firstName: '',
        roles: [],
      },
    });
    return response;
  },

  resetPassword: async (data: ResetPasswordRequest) => {
    const response = await authService.resetPassword(data);
    return response;
  },

  setAuthenticated: (access_token: string, user: BasicUser) => {
    set({
      status: 'authenticated',
      access_token,
      user,
    });
  },

  setUnauthenticated: () => {
    set({
      status: 'unauthenticated',
      access_token: undefined,
      user: undefined,
    });
  },
}));
