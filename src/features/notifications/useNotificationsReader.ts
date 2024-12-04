import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeNotificationStatus } from "../../services/apiNotifications";
import { useNotifications } from "@toolpad/core";

type readNotificationType = {
    ids: string[],
    newStatus: 0|1
}

export function useNotificationsReader() {
    const notifications = useNotifications()
    const queryClient = useQueryClient();
    const { mutateAsync: notificationsReader, isPending } = useMutation({
        mutationFn: async ({ids, newStatus}: readNotificationType) => {
            await changeNotificationStatus(ids, newStatus)
            queryClient.invalidateQueries({ queryKey:['notifications'] })
        },
        onError: (err) => {            
            notifications.show(err.message.response?.data?.title, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { notificationsReader, isLoading: isPending };
}
