import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNotifications } from '@toolpad/core';
import { updateTokens } from '../../utils/handleTokens';


export function useLogin() {
    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const { mutateAsync: login, isPending } = useMutation({
        mutationFn: ({ workId, password, rememberUser }) => loginApi({ workId, password, rememberUser }),
        onSuccess: ({ data, rememberUser }) => {
            updateTokens(data.accessToken, data.refreshToken, rememberUser);
            notifications.show('Logged in successfully', {
                severity: 'success',
                autoHideDuration: 3000,
            });

            queryClient.invalidateQueries();
        },
        onError: () => {      
            notifications.show('Invalid credentials', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { login, isLoading: isPending };
}
