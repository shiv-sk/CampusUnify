import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/authContext.jsx';


export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {loginUser} = useAuth();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      loginUser(user);
      navigate('/events');
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { login, isLoading };
}
