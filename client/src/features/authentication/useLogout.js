import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/authContext';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {logoutUser} = useAuth();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.resetQueries();
      logoutUser();
      navigate('/login', { replace: true });
      toast.success('You have been logged out');
    },
  });

  return { logout, isLoading };
}
