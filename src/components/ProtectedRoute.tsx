// src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

	console.log('auth')

    const isAuthenticated = () => {
        // Implement your authentication check logic here
        // For example, check if a token exists in localStorage
        //return !!localStorage.getItem('authToken');
				console.log('isauthenticated', localStorage.getItem('authToken'));
        return !!localStorage.getItem('authToken');
				//return true;
    };

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
