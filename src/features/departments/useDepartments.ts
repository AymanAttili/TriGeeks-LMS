import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../../services/apiDepartments";

export function useDepartments(userRole) {

    const { isFetching, data: departments } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            if (userRole === 'Admin')
                return (await getDepartments()).data

            return null;
        },

        throwOnError: true
    });

    return { isLoading: isFetching, departments };
}
