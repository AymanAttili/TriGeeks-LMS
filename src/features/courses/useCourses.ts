import { useQuery } from "@tanstack/react-query";
import { searchCourses } from "../../services/apiCourses";

const initialQuery = {
    page: 1,
    pageSize: 9999
}

export function useCourse(query = initialQuery) {

    const { isFetching, data: course, error, isError } = useQuery({
        queryKey: ["course", query],
        queryFn: async () => await searchCourses(query),
        throwOnError: true
    });

    return { isLoading: isFetching, course, error, isError };
}
