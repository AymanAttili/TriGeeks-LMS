import { useQuery } from "@tanstack/react-query";
import { getCourseAssigns } from "../../services/apiCourses";

export function useCourseAssignments(courseId: string) {
    const { isFetching, data: courseAssignments, error, isError } = useQuery({
        queryKey: ["courseAssignments", courseId],
        queryFn: async () => (await getCourseAssigns(courseId)).data.map((major) => major.majorId),
        throwOnError: true
    });

    return { isLoading: isFetching, courseAssignments, error, isError };
}
