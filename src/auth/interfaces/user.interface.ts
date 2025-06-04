export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  countryCode?: string;
  phoneNumber?: string;
  birthdate?: string;
  lastLogin?: string;
  roles: string[];
  createdAt: string;
  updatedAt?: string;
}
