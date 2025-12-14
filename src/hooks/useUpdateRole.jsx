import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';


export const useUpdateRole = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, role }) => axiosSecure.patch(`/users/role/${id}`, { role }),
    {
      onSuccess: () => queryClient.invalidateQueries(['users']),
    }
  );
};
