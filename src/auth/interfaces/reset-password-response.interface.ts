import { User } from './user.interface';

export interface ResetPasswordResponse {
  message: string;
  user: User;
}
