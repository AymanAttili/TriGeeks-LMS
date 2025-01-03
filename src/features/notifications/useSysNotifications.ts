import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/apiNotifications";


export function useSysNotifications(page = 1) {
    const { isFetching, data: notifications, error, isError } = useQuery({
        queryKey: ["notifications", page],
        queryFn: async() => {
            return (await getNotifications(page)).data
        },
        throwOnError: true,
        refetchInterval: 1000 * 60 * 10
    });
    
    return { isLoading: isFetching, notifications, error, isError };
}
