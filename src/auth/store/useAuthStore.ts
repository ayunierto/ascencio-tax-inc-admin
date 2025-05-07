import { create } from 'zustand';

import {
  User,
  SignUpRequest,
  SignUpResponse,
  VerifyCodeResponse,
  VerifyCodeRequest,
  SigninRequest,
  SigninResponse,
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  DeleteAccountResponse,
} from '../interfaces';
import {
  checkStatus,
  deleteAccountAction,
  forgotPasswordAction,
  resetPasswordAction,
  signinAction,
  signupAction,
  verifyCodeAction,
} from '../actions';
import { DeleteAccountRequest } from '../interfaces/delete-account-request.interface';
import { Exception } from '@/interfaces/exception.interface';
import { StorageAdapter } from '@/utils/adapters/storage.adapter';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  signup: (values: SignUpRequest) => Promise<SignUpResponse | Exception>;
  verifyCode: (
    data: VerifyCodeRequest
  ) => Promise<VerifyCodeResponse | Exception>;
  signin: (credentials: SigninRequest) => Promise<SigninResponse | Exception>;
  checkStatus: () => Promise<SigninResponse | Exception>;
  deleteAccount: (
    data: DeleteAccountRequest
  ) => Promise<DeleteAccountResponse | Exception>;
  logout: () => void;
  setAuthenticated: (token: string, user: User) => void;
  setUnauthenticated: () => void;
  setUser: (user: User) => void;
  forgotPassword: (
    data: ForgotPasswordRequest
  ) => Promise<ForgotPasswordResponse>;
  resetPassword: (
    data: ResetPasswordRequest
  ) => Promise<ResetPasswordResponse | Exception>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  signup: async (data: SignUpRequest) => {
    const response = await signupAction(data);
    if ('user' in response) {
      set({ user: response.user });
    }
    return response;
  },

  verifyCode: async (data: VerifyCodeRequest) => {
    const response = await verifyCodeAction(data);
    return response;
  },

  signin: async (credentials: SigninRequest) => {
    const response = await signinAction(credentials);

    if ('token' in response) {
      StorageAdapter.setItem('token', response.token);
      get().setAuthenticated(response.token, response.user);
      return response;
    }

    get().setUnauthenticated();
    return response;
  },

  deleteAccount: async (data: DeleteAccountRequest) => {
    const response = await deleteAccountAction(data);

    if ('error' in response) {
      return response;
    }

    StorageAdapter.removeItem('token');
    get().setUnauthenticated();
    return response;
  },

  checkStatus: async () => {
    const response = await checkStatus();

    if ('token' in response) {
      StorageAdapter.setItem('token', response.token);
      get().setAuthenticated(response.token, response.user);
      return response;
    }

    if (response.error === 'Network Error') {
      console.error('Network error occurred while checking status.');
      set({ status: 'checking' });
    } else {
      get().setUnauthenticated();
    }
    return response;
  },

  logout: () => {
    StorageAdapter.removeItem('token');
    get().setUnauthenticated();
  },

  forgotPassword: async (data: ForgotPasswordRequest) => {
    const response = await forgotPasswordAction(data);
    set({
      user: {
        email: data.email,
        createdAt: '',
        id: '',
        lastName: '',
        name: '',
        roles: [],
      },
    });
    return response;
  },

  resetPassword: async (data: ResetPasswordRequest) => {
    const response = await resetPasswordAction(data);
    return response;
  },

  setAuthenticated: (token: string, user: User) => {
    set({
      status: 'authenticated',
      token: token,
      user: user,
    });
    console.warn('Authenticated');
  },

  setUnauthenticated: () => {
    set({
      status: 'unauthenticated',
      token: undefined,
      user: undefined,
    });
  },

  setUser: (user: User) => {
    set({ user: user });
  },
}));
