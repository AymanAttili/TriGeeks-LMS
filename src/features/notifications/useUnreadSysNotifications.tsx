import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationsCount } from "../../services/apiNotifications";


export function useUnreadSysNotifications() {
    const { isFetching, data: unreadCount, error, isError } = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            const res = await getUnreadNotificationsCount();
            return res.data.count;
        },
        throwOnError: true
    });

    return { isLoading: isFetching, unreadCount, error, isError };
}
