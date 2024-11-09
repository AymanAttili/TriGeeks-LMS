import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../../services/apiDepartments";
import { roleNames } from "../../Enums/roles";

export function useDepartments(userRole) {

    const { isFetching, data: departments } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            if (userRole === 'Admin')
                return getDepartments()

            return null;
        },

        throwOnError: true
    });

    return { isLoading: isFetching, departments };
}
