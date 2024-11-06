import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../features/users/useUser';
import SpinnerLoader from './SpinnerLoader';
function PrivateRoute() {
    const { isAuthenticated, isLoading } = useUser();
    if (isLoading)
        return <SpinnerLoader />

    return isAuthenticated ? <Navigate replace to="/dashboard" /> : <Outlet />;
}

export default PrivateRoute;