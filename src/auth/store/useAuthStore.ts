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
import { Exception } from '@/interfaces/exception.interface';
import {
  checkStatusAction,
  deleteAccountAction,
  forgotPasswordAction,
  resetPasswordAction,
  signinAction,
  signupAction,
  verifyCodeAction,
} from '../actions';
import { DeleteAccountRequest } from '../interfaces';
import { storageAdapter } from '@/adapters/StorageAdapter';

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
  logout: () => Promise<void>;
  setAuthenticated: (token: string, user: User) => void;
  setUnauthenticated: () => void;
  setUser: (user: User) => void;
  forgotPassword: (
    data: ForgotPasswordRequest
  ) => Promise<ForgotPasswordResponse | Exception>;
  resetPassword: (
    data: ResetPasswordRequest
  ) => Promise<ResetPasswordResponse | Exception>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isApiErrorResponse(obj: any): obj is Exception {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.message === 'string' &&
    typeof obj.statusCode === 'number'
  );
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  checkStatus: async () => {
    const response = await checkStatusAction();

    if (isApiErrorResponse(response)) {
      get().setUnauthenticated();
      return response;
    }

    storageAdapter.setItem('token', response.token);
    get().setAuthenticated(response.token, response.user);
    return response;
  },

  signup: async (data: SignUpRequest) => {
    const response = await signupAction(data);
    if ('user' in response && !isApiErrorResponse(response)) {
      set({ user: (response as SignUpResponse).user });
    }
    return response;
  },

  verifyCode: async (data: VerifyCodeRequest) => {
    const response = await verifyCodeAction(data);
    return response;
  },

  signin: async (credentials: SigninRequest) => {
    const response = await signinAction(credentials);

    if (isApiErrorResponse(response)) {
      get().setUnauthenticated();
      return response;
    }

    storageAdapter.setItem('token', response.token);
    get().setAuthenticated(response.token, response.user);
    return response;
  },

  deleteAccount: async (data: DeleteAccountRequest) => {
    const response = await deleteAccountAction(data);

    if (isApiErrorResponse(response)) {
      return response;
    }

    storageAdapter.removeItem('token');
    get().setUnauthenticated();
    return response;
  },

  logout: async () => {
    storageAdapter.removeItem('token');
    get().setUnauthenticated();
  },

  forgotPassword: async (data: ForgotPasswordRequest) => {
    const response = await forgotPasswordAction(data);
    if (!isApiErrorResponse(response)) {
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
    }
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
