import { create } from 'zustand';

import {
  SignUpRequest,
  SignUpResponse,
  VerifyEmailCodeResponse,
  VerifyEmailCodeRequest,
  SignInResponse,
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  DeleteAccountResponse,
  BasicUser,
  SignInRequest,
  CheckStatusResponse,
  UpdateProfileResponse,
  UpdateProfileRequest,
  DeleteAccountRequest,
} from '../interfaces';
import {
  checkStatus,
  deleteAccount,
  forgotPassword,
  resetPassword,
  singIn,
  signUp,
  verifyEmailCode,
  updateProfile,
} from '../actions';
import { storageAdapter } from '@/adapters/StorageAdapter';

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
    const response = await signUp(data);
    if ('user' in response) {
      set({ user: response.user });
    }
    return response;
  },

  verifyEmailCode: async (data: VerifyEmailCodeRequest) => {
    const response = await verifyEmailCode(data);
    return response;
  },

  signIn: async (credentials: SignInRequest) => {
    const response = await singIn(credentials);

    if ('access_token' in response) {
      await storageAdapter.setAccessToken(response.access_token);
      get().setAuthenticated(response.access_token, response.user);
      return response;
    }

    return response;
  },

  updateProfile: async (data: UpdateProfileRequest) => {
    const response = await updateProfile(data);
    if ('user' in response) {
      set({ user: response.user });
    }
    return response;
  },

  deleteAccount: async (data: DeleteAccountRequest) => {
    const response = await deleteAccount(data);

    if ('error' in response) {
      return response;
    }

    await storageAdapter.removeAccessToken();
    get().setUnauthenticated();
    return response;
  },

  checkStatus: async () => {
    const response = await checkStatus();

    if ('access_token' in response) {
      await storageAdapter.setAccessToken(response.access_token);
      get().setAuthenticated(response.access_token, response.user);
      return response;
    }

    console.log(response);
    get().setUnauthenticated();
    if (response.error === 'Network Error') {
      set({ status: 'checking' });
    }
    return response;
  },

  logout: async () => {
    await storageAdapter.removeAccessToken();
    get().setUnauthenticated();
  },

  forgotPassword: async (data: ForgotPasswordRequest) => {
    const response = await forgotPassword(data);
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
    const response = await resetPassword(data);
    return response;
  },

  setAuthenticated: (access_token: string, user: BasicUser) => {
    set({
      status: 'authenticated',
      access_token: access_token,
      user: user,
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
