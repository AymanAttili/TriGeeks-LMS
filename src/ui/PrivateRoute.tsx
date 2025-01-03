import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../features/users/useUser';
import { roleNames } from '../Enums/roles';
import SpinnerLoader from './SpinnerLoader';

function PrivateRoute({ children, allowedRoles, checkAuth = false }) {
    const { isAuthenticated, user, isLoading } = useUser();

    if (isLoading)
        return <SpinnerLoader />

    if (!isAuthenticated) {
        return <Navigate replace to="/login" />;
    }

    if (checkAuth)
        return children;

    return allowedRoles.includes(roleNames[user.role]) ? <Outlet /> : <Navigate replace to="/" />;
}

export default PrivateRoute;