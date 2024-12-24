import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/apiNotifications";

const initialPayload = {
    filters: "",
    sorts: "",
    page: 1,
    pageSize: 6
}

export function useSysNotifications(payload = initialPayload) {
    const { isFetching, data: notifications, error, isError } = useQuery({
        queryKey: ["notifications", payload],
        queryFn: async() => {
            const res = await getNotifications(payload)
            return res.data;
        },
        throwOnError: true
    });
    
    return { isLoading: isFetching, notifications, error, isError };
}
