import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import axios from 'axios';
import useAuth from './useAuth';


export const useMarkFraud = () => {
  const {user} = useAuth()
  // const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation(
    // (id) => axiosSecure.patch(`/users/fraud/${id}`),
    (id) => axios.patch(`${import.meta.env.VITE_API_URL}/users/fraud/${id}`,{headers:{Authorization:`bearer ${user.accessToken}`}}),
    {
      onSuccess: () => queryClient.invalidateQueries(['users']),
    }
  );
};
