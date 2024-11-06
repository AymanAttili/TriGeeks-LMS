import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@toolpad/core';
import { updateTokens } from '../../utils/handleTokens';


export function useLogin() {
    const queryClient = useQueryClient();
    const notifications = useNotifications();
    const navigate = useNavigate();


    const { mutate: login, isPending } = useMutation({
        mutationFn: ({ workId, password, rememberUser }) => loginApi({ workId, password, rememberUser }),
        onSuccess: ({ data, rememberUser }) => {
            updateTokens(data.accessToken, data.refreshToken, rememberUser);
            notifications.show('Logged in successfully', {
                severity: 'success',
                autoHideDuration: 3000,
            });

            queryClient.invalidateQueries('user');
            navigate('/dashboard', { replace: true });
        },
        onError: (err) => {
            notifications.show(err.message, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { login, isLoading: isPending };
}
