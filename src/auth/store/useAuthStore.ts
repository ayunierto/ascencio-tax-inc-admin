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
import { Exception } from '@/interfaces/exception.interface'; // Asegúrate de la ruta
import {
  checkStatus as checkStatusAction, // Renombrado para evitar conflicto con el método del store
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
  checkStatus: () => Promise<SigninResponse | Exception>; // El tipo de retorno es crucial
  deleteAccount: (
    data: DeleteAccountRequest
  ) => Promise<DeleteAccountResponse | Exception>;
  logout: () => Promise<void>;
  setAuthenticated: (token: string, user: User) => void;
  setUnauthenticated: () => void;
  setUser: (user: User) => void;
  forgotPassword: (
    data: ForgotPasswordRequest
  ) => Promise<ForgotPasswordResponse | Exception>; // Asegúrate de que esto también puede devolver Exception
  resetPassword: (
    data: ResetPasswordRequest
  ) => Promise<ResetPasswordResponse | Exception>;
}

/**
 * Predicado de tipo para determinar si un objeto es una respuesta de error de la API (Exception).
 * Copia o importa esta función desde donde la definas (e.g., check-status.action.ts o un utils).
 * DEBE COINCIDIR CON LA DEFINICIÓN UTILIZADA EN check-status.action.ts
 */
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
    // Usamos el checkStatusAction importado para evitar conflicto con el método del store.
    const response = await checkStatusAction();

    // Verificamos si la respuesta es una excepción de la API (ej. 401)
    if (isApiErrorResponse(response)) {
      // Si es una excepción, el usuario no está autenticado.
      get().setUnauthenticated();
      return response; // Devolvemos la excepción para que el componente/lógica superior la maneje.
    }

    // Si no es una excepción, asumimos que es una SigninResponse exitosa.
    storageAdapter.setItem('token', response.token);
    get().setAuthenticated(response.token, response.user);
    return response;
  },

  signup: async (data: SignUpRequest) => {
    const response = await signupAction(data);
    // Asumiendo que signupAction ya maneja si devuelve SigninResponse o Exception
    if ('user' in response && !isApiErrorResponse(response)) {
      // Aseguramos que no es una Exception que tiene 'user'
      set({ user: (response as SignUpResponse).user });
    }
    return response;
  },

  verifyCode: async (data: VerifyCodeRequest) => {
    const response = await verifyCodeAction(data);
    return response; // Devolverá VerifyCodeResponse o Exception
  },

  signin: async (credentials: SigninRequest) => {
    const response = await signinAction(credentials);

    // Similar a checkStatus, verificamos si es una excepción de la API
    if (isApiErrorResponse(response)) {
      get().setUnauthenticated(); // Opcional: desautenticar en caso de error de login
      return response; // Devolvemos la excepción
    }

    // Si no es una excepción, asumimos que es una SigninResponse exitosa.
    storageAdapter.setItem('token', response.token);
    get().setAuthenticated(response.token, response.user);
    return response;
  },

  deleteAccount: async (data: DeleteAccountRequest) => {
    const response = await deleteAccountAction(data);

    // Verificar si es una excepción de la API
    if (isApiErrorResponse(response)) {
      return response;
    }

    // Si no es una excepción, significa que la eliminación fue exitosa
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
    // Considera si forgotPasswordAction también puede devolver Exception
    // y maneja aquí si es necesario
    if (!isApiErrorResponse(response)) {
      // Si no es un error, asumimos éxito
      set({
        user: {
          email: data.email,
          createdAt: '', // Estos campos pueden necesitar ser ajustados o ser opcionales
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
