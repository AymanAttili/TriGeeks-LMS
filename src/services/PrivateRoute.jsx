import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function PrivateRoute({ children, allowedRoles, checkAuth = false }) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (checkAuth)
        return children;

    console.log(allowedRoles.includes(user?.role));



    return allowedRoles.includes(user?.role) ? <Outlet /> : <Navigate replace to="/" />;
}

export default PrivateRoute;