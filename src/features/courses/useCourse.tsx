import { useQuery } from "@tanstack/react-query";
import { getCourse } from "../../services/apiCourses";

export function useCourse(courseId: number) {

    const { isFetching, data: course } = useQuery({
        queryKey: ["course", courseId],
        queryFn: async () => await getCourse(courseId),
        throwOnError: true
    });

    return { isLoading: isFetching, course };
}
