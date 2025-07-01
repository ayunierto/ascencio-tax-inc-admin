import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import { SignUpRequest, SignUpResponse } from '../interfaces';
import { toast } from 'sonner';
import { CircleX, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router';

export const useSignUpMutation = () => {
  const navigate = useNavigate();
  const { signUp } = useAuthStore();

  return useMutation<SignUpResponse, Error, SignUpRequest>({
    mutationFn: async (newUser: SignUpRequest) => {
      return await signUp(newUser);
    },
    onSuccess: async (data: SignUpResponse) => {
      if ('error' in data) {
        toast('Error', {
          description: data.message,
          dismissible: false,
          position: 'top-center',
          icon: <CircleX size={18} />,
        });
        return;
      }

      toast('User registered successfully', {
        icon: <LogIn size={18} />,
        description: 'Please sign in to continue.',
        position: 'top-center',
      });

      navigate('/auth/signin');
    },
  });
};
