import { useQuery } from "@tanstack/react-query";
import { getCourse } from "../../services/apiCourses";

export function useCourse(courseId: string) {

    const { isFetching, data: course, error, isError } = useQuery({
        queryKey: ["course", courseId],
        queryFn: async () => await getCourse(courseId),
        throwOnError: true
    });

    return { isLoading: isFetching, course, error, isError };
}
