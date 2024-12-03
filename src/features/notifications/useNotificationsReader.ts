import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeNotificationStatus } from "../../services/apiNotifications";

type readNotificationType = {
    ids: string[],
    newStatus: 0|1
}

export function useNotificationsReader() {
    const queryClient = useQueryClient();
    const { mutate: notificationsReader, isPending } = useMutation({
        mutationFn: async ({ids, newStatus}: readNotificationType) => {
            await changeNotificationStatus(ids, newStatus)
            queryClient.invalidateQueries({ queryKey:['notifications'] })
        }
    });

    return { notificationsReader, isLoading: isPending };
}
