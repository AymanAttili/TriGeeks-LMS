import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../../services/apiDepartments";

export function useDepartments(userRole = 'Admin') {

    const { isFetching, data: departments } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            if (userRole === 'Admin')
                return await getDepartments()

            return null;
        },

        throwOnError: true
    });

    return { isLoading: isFetching, departments };
}
