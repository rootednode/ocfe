// src/hocs/withAuth.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';

// Higher-Order Component (HOC) for authentication and role-based access
const withAuth = (Component: React.ComponentType, requiredRole?: string) => {
    return (props: any) => {
        // Check if the user is authenticated
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            console.error('User not authenticated. Redirecting to login.');
            return <Navigate to="/login" replace />;
        }

        // Check if the user has the required role (if specified)
        if (requiredRole) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.role !== requiredRole) {
                console.error('User lacks required role. Redirecting to unauthorized.');
                return <Navigate to="/unauthorized" replace />;
            }
        }

        // If authenticated and authorized, render the wrapped component
        return <Component {...props} />;
    };
};

export default withAuth;
