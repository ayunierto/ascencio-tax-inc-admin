import { api } from '@/api/api';
import { UserResponse } from '../interfaces/user.response';

export const getUserByIdAction = async (id: string): Promise<UserResponse> => {
  if (id === 'new') {
    return {
      id: 'new',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      countryCode: '',
      phoneNumber: '',
      locale: '',
      isActive: true,
      createdAt: '',
      updatedAt: '',
      isEmailVerified: false,
      roles: [],
      timeZone: '',
    };
  }
  const { data } = await api.get<UserResponse>(`/users/${id}`);
  return data;
};
