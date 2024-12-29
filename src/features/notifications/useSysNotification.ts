import { useQuery } from "@tanstack/react-query";
import { getNotification } from "../../services/apiNotifications";


export function useSysNotification(id: string) {
    const { isFetching, data: notification, error, isError } = useQuery({
        queryKey: ["notification", id],
        queryFn: async() => {
            return (await getNotification(id)).data.items.at(0)
        },
        throwOnError: true
    });
    
    return { isLoading: isFetching, notification, error, isError };
}
