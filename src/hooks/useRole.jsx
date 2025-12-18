import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useRole = () => {

    const {user, loading} = useAuth()
    // const axiosSecure = useAxiosSecure() 
    
    const {data: role, isLoading: isRoleLoading} = useQuery({
        enabled:!loading && !!user?.email,
        queryKey:['role', user?.email],
        queryFn: async () => {
            const {data} = await axios(`${import.meta.env.VITE_API_URL}/users/role?email=${user?.email}`,{headers:{Authorization:`bearer ${user.accessToken}`}})
             return data?.role ?? null
        }

    })
    return [role, isRoleLoading]
};

export default useRole;