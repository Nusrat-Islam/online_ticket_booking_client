import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import axios from 'axios';
import useAuth from './useAuth';


export const useUpdateRole = () => {
  const {user} = useAuth()
  // const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation(
    // ({ id, role }) => axiosSecure.patch(`/users/role/${id}`, { role }),
    ({id,role}) => axios.patch(`${import.meta.env.VITE_API_URL}/users/role/${id}`,{ role },{headers:{Authorization:`bearer ${user.accessToken}`}}),
    {
      onSuccess: () => queryClient.invalidateQueries(['users']),
    }
  );
};
