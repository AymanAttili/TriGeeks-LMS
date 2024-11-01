import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie'
function PublicRoute() {
    return isNotAuthenticated() ? <Outlet /> : <Navigate to="/dashboard" />;
}

function isNotAuthenticated() {
    return !Cookies.get('authToken');
}
export default PublicRoute;