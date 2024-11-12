import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../../services/apiDepartments";

export function useDepartments() {

    const { isFetching, data: departments } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            return await getDepartments()
        },

        throwOnError: true
    });

    return { isLoading: isFetching, departments };
}
