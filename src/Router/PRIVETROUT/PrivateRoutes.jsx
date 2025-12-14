import React from 'react';
// import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../HooKs/useAuth';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading w-18 loading-spinner text-gray-400"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={location.pathname} replace />;
    }

    return children;
};

export default PrivateRoutes;