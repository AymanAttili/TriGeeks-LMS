import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../features/users/useUser';
import { roleNames } from '../Enums/roles';

function PrivateRoute({ children, allowedRoles, checkAuth = false }) {
    const { isAuthenticated, user } = useUser();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (checkAuth)
        return children;

    return allowedRoles.includes(roleNames[user.role]) ? <Outlet /> : <Navigate replace to="/" />;
}

export default PrivateRoute;