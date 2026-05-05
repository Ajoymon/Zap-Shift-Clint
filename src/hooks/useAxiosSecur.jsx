import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
  baseURL: 'https://zap-shift-server-livid-psi.vercel.app',
});

const useAxiosSecur = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    });
    // interceptor responsc
    const resInterceptor = axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        // console.log(error);
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate('/login');
          });
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.request.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);
  return axiosInstance;
};

export default useAxiosSecur;
