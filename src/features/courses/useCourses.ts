import { useQuery } from "@tanstack/react-query";
import { searchCourses } from "../../services/apiCourses";

const initialQuery = {
    page: 1,
    pageSize: 9999
}

export function useCourses(query = initialQuery) {

    const { isFetching, data: courses, error, isError } = useQuery({
        queryKey: ["courses", query],
        queryFn: async () => (await searchCourses(query)).data.items,
        throwOnError: true
    });

    return { isLoading: isFetching, courses, error, isError };
}
