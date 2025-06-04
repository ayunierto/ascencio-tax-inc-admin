import { Loader } from '@/components/Loader';
import { SigninForm } from '../components';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router';

export const SigninPage = () => {
  const { status } = useAuthStore();

  if (status === 'checking') return <Loader />;

  if (status === 'authenticated') return Navigate({ to: '/dashboard' });

  return <SigninForm />;
};
