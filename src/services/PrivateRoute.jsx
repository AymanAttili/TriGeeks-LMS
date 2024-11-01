import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie'
function PrivateRoute() {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
}

function isAuthenticated() {
    return !!Cookies.get('authToken');
}
export default PrivateRoute;
