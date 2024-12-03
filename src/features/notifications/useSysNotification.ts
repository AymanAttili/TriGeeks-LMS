import { useQuery } from "@tanstack/react-query";
import { getNotification } from "../../services/apiNotifications";

export function useSysNotification(id) {

    const { isFetching, data: notification  } = useQuery({
        queryKey: ["notification", id],
        queryFn: async() => await getNotification(id),
        throwOnError: true
    });
    
    return { isLoading: isFetching, notification };
}
