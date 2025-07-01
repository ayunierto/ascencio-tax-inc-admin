import { useNavigate } from 'react-router';
import { SigninForm } from '../components';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect } from 'react';

export const SigninPage = () => {
  const { status } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/dashboard');
    }
  }, [status, navigate]);

  if (status === 'authenticated') {
    return null;
  }

  return <SigninForm />;
};
