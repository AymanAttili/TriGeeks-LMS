import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../features/authentication/authSlice';

export function useAuth() {
    const dispatch = useDispatch();
    const { user, isAuthenticated, status, error } = useSelector((state) => state.auth);

    const loginUser = (credentials) => dispatch(login(credentials));
    const logoutUser = () => dispatch(logout());

    return { user, isAuthenticated, status, error, loginUser, logoutUser };
}