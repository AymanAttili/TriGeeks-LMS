import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/apiNotifications";

export function useSysNotifications() {

    const { isFetching, data: notifications  } = useQuery({
        queryKey: ["notifications"],
        queryFn: async() => await getNotifications(),
        throwOnError: true
    });
    
    return { isLoading: isFetching, notifications };
}
