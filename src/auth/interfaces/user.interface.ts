export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode?: string;
  phoneNumber?: string;
  locale?: string;
  roles: string[];
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}
