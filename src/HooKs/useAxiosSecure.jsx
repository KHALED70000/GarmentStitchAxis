import axios from 'axios';
import React, { useEffect } from 'react';

import { useNavigate } from 'react-router';
import useAuth from '../HooKs/useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
    // baseURL: 'https://nest-cloth-server.vercel.app'
})

const useAxiosSecure = () => {
    const kickOutTo = useNavigate()
    const { user, logOut } = useAuth();
    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`;
            return config;
        });

        //response interceptor

        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            console.log(error);

            const statusCode = error.status;
            if (statusCode === 401 || statusCode === 403) {
                logOut()
                    .then(() => {
                        kickOutTo('/login')
                    })
            }

            return Promise.reject(error)
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)
        }
        
    }, [user, logOut, kickOutTo])
    return axiosSecure;
};

export default useAxiosSecure;