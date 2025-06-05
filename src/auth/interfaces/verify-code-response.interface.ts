import { User } from './user.interface';

export interface VerifyCodeResponse {
  message: string;
  user: User;
}
