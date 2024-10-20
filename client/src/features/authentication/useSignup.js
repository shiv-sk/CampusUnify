import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../../services/apiAuth.js';
import { useAuth } from '../../context/authContext.jsx';


export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {registerUser} = useAuth();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ name, email, role, password, passwordConfirm }) =>
      signupApi({ name, email, role, password, passwordConfirm }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      registerUser(user);
      navigate('/events');
      toast.success('Account created successfully');
    },
    onError: (err) => {
      console.log('err', err);
      toast.error(err.response.data.message);
    },
  });

  return { signup, isLoading };
}
