export interface SignUpRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
  countryCode?: string;
  phoneNumber?: string;
}
