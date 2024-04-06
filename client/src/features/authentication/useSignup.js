import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ name, email, password, passwordConfirm }) =>
      signupApi({ name, email, password, passwordConfirm }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/dashboard');
      toast.success('Account created successfully');
    },
    onError: (err) => {
      toast.error('There was an error creating your account');
    },
  });

  return { signup, isLoading };
}
