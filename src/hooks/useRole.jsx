import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecur from './useAxiosSecur';

const useRole = () => {
  const { user } = useAuth();
  const axoiosSecure = useAxiosSecur();
  const { isLoading: roleLoadig, data: role = 'user' } = useQuery({
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axoiosSecure.get(`/users/${user.email}/role`);
      console.log(res);
      return res.data?.role || 'user';
    },
  });
  return { roleLoadig, role };
};

export default useRole;
