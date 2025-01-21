import { useQuery } from "@tanstack/react-query";
import { searchCourses } from "../../services/apiCourses";

const initialQuery = {
    page: 1,
    pageSize: 12
}

export function useCourses(query = initialQuery) {

    const { isFetching, data, error, isError } = useQuery({
        queryKey: ["courses", query],
        queryFn: async () => (await searchCourses(query)).data,
        throwOnError: true
    });

    return { isLoading: isFetching, courses: data?.items, metadata: data?.metadata, error, isError };
}
