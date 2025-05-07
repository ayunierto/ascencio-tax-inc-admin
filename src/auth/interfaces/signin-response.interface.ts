import { User } from './user.interface';

export interface SigninResponse {
  user: User;
  token: string;
}
