import { useMutation } from '@tanstack/react-query';
import { SignInRequest, SignInResponse } from '../interfaces';
import { toast } from 'sonner';
import { CircleX, LogIn } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router';
import { ExceptionResponse } from '@/interfaces';

export const useSignInMutation = () => {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  return useMutation<SignInResponse, ExceptionResponse, SignInRequest>({
    mutationFn: async (credentials) => {
      return signIn(credentials);
    },
    onSuccess: async (data) => {
      if ('error' in data) {
        toast('Error', {
          description: data.message,
          dismissible: false,
          position: 'top-center',
          icon: <CircleX size={18} />,
        });
        return;
      }

      toast.success('Login successful', {
        icon: <LogIn size={18} />,
        description: 'Welcome back!',
        position: 'top-center',
      });
      navigate('/dashboard');
    },
    onError: (error) => toast.error(error.message),
  });
};
