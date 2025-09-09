import { create } from "zustand";

import {
  User,
  SignUpResponse,
  VerifyCodeResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  DeleteAccountResponse,
  AuthResponse,
} from "../interfaces";
import {
  checkAuthStatusAction,
  deleteAccountAction,
  forgotPasswordAction,
  resetPasswordAction,
  signInAction,
  signUpAction,
  verifyCodeAction,
} from "../actions";
import {
  DeleteAccountRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  SignInRequest,
  SignUpApiRequest,
  VerifyCodeRequest,
} from "../schemas";
import { StorageAdapter } from "@/adapters/storage.adapter";

type AuthStatus = "authenticated" | "unauthenticated" | "loading";

export interface AuthState {
  // Properties
  authStatus: AuthStatus;
  access_token: string | null;
  user: User | null;
  tempEmail?: string; // For storing email during password reset

  // Getters
  isAdmin: () => boolean;

  // Methods
  signUp: (data: SignUpApiRequest) => Promise<SignUpResponse>;
  verifyCode: (data: VerifyCodeRequest) => Promise<VerifyCodeResponse>;
  signIn: (credentials: SignInRequest) => Promise<AuthResponse>;
  checkAuthStatus: () => Promise<boolean>;
  deleteAccount: (data: DeleteAccountRequest) => Promise<DeleteAccountResponse>;
  logout: () => Promise<void>;
  forgotPassword: (
    data: ForgotPasswordRequest
  ) => Promise<ForgotPasswordResponse>;
  resetPassword: (data: ResetPasswordRequest) => Promise<ResetPasswordResponse>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  access_token: null,
  user: null,
  authStatus: "loading",
  tempEmail: undefined,

  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes("admin");
  },

  checkAuthStatus: async () => {
    const access_token = StorageAdapter.getItem("access_token");
    if (!access_token) {
      set({ authStatus: "unauthenticated", user: null, access_token: null });
      return false;
    }

    try {
      const response = await checkAuthStatusAction();
      StorageAdapter.setItem("access_token", response.access_token);
      set({
        user: response.user,
        access_token: response.access_token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      StorageAdapter.removeItem("access_token");
      set({
        user: undefined,
        access_token: undefined,
        authStatus: "unauthenticated",
      });
      return false;
    }
  },

  signUp: async (data: SignUpApiRequest) => {
    try {
      const response = await signUpAction(data);
      set({ tempEmail: data.email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  verifyCode: async (data: VerifyCodeRequest) => {
    const response = await verifyCodeAction(data);
    return response;
  },

  signIn: async (credentials: SignInRequest) => {
    try {
      const response = await signInAction(credentials);
      StorageAdapter.setItem("access_token", response.access_token);
      set({
        user: response.user,
        access_token: response.access_token,
        authStatus: "authenticated",
      });
      return response;
    } catch (error) {
      StorageAdapter.removeItem("access_token");
      set({ user: null, access_token: null, authStatus: "unauthenticated" });
      throw error;
    }
  },

  deleteAccount: async (data: DeleteAccountRequest) => {
    const response = await deleteAccountAction(data);

    StorageAdapter.removeItem("access_token");
    set({ user: null, access_token: null, authStatus: "unauthenticated" });
    return response;
  },

  logout: async () => {
    StorageAdapter.removeItem("access_token");
    set({ user: null, access_token: null, authStatus: "unauthenticated" });
  },

  forgotPassword: async (data: ForgotPasswordRequest) => {
    const response = await forgotPasswordAction(data);
    set({
      user: {
        email: data.email,
        createdAt: "",
        id: "",
        lastName: "",
        firstName: "",
        roles: [],
        updatedAt: "",
        countryCode: "",
        phoneNumber: "",
        lastLoginAt: "",
      },
    });
    return response;
  },

  resetPassword: async (data: ResetPasswordRequest) => {
    const response = await resetPasswordAction(data);
    return response;
  },
}));
