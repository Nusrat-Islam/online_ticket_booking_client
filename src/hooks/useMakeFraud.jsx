import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';


export const useMarkFraud = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation(
    (id) => axiosSecure.patch(`/users/fraud/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries(['users']),
    }
  );
};
