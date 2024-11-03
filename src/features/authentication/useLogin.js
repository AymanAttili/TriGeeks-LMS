import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { convertToJson } from '../../utils/helpers';
import { useNotifications } from '@toolpad/core';


export function useLogin() {
    const notifications = useNotifications();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ workId, password, rememberUser }) => loginApi({ workId, password, rememberUser }),
        onSuccess: ({ data, rememberUser }) => {
            Cookies.set('accessToken', JSON.stringify(data.accessToken), {
                expires: rememberUser ? 30 : 60 / 1440, // 60 mins from BE
                secure: true,
                sameSite: 'Strict',
            });
            Cookies.set('refreshToken', JSON.stringify(data.refreshToken), {
                expires: rememberUser ? 30 : 60 / 1440, // 30 days from BE
                secure: true,
                sameSite: 'Strict',
            });

            const user = convertToJson(data.accessToken)

            queryClient.setQueryData(['user'], user);
            notifications.show('Logged in successfully', {
                severity: 'success',
                autoHideDuration: 3000,

            });
            navigate('/dashboard', { replace: true });
        },
        onError: (err) => {
            notifications.show(err.message, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { login, isLoading };
}
