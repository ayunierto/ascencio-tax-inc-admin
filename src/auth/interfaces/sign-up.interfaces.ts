import { User } from './user.interface';

export interface SignUpResponse {
  message: string;
  user: User;
}

export interface SignUpRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
  countryCode?: string;
  phoneNumber?: string;
}
