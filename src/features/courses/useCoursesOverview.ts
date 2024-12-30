import { useQuery } from "@tanstack/react-query";
import { getCoursesOverview } from "../../services/apiCourses";

export function useCoursesOverview() {
    const { isFetching, data: coursesOverview, error, isError, refetch } = useQuery({
        queryKey: ["coursesOverview"],
        queryFn: async () => (await getCoursesOverview()).data
    });

    return { isLoading: isFetching, coursesOverview, error, isError ,refetch};
}
