import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core";
import { markAllNotificationsAsRead, readNotification } from "../../services/apiNotifications";
import { AxiosError } from "axios";


export function useNotificationsReader() {
    const notifications = useNotifications()
    const queryClient = useQueryClient();
    const { mutateAsync: notificationsReader, isPending, error, isError } = useMutation({
        mutationFn: async ({action, payload}) => {
            switch(action){
                case 'readOne': await readNotification(payload.id); break; 
                case 'readAll': await markAllNotificationsAsRead(); break; 
                default: throw new AxiosError('Unknown action')
            }
            queryClient.invalidateQueries({ queryKey:['notifications'] })
        },
        onError: (err) => {            
            notifications.show(err.message.response?.data?.title, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { notificationsReader, isLoading: isPending, error, isError };
}
