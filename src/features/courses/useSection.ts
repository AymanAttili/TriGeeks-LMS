import { useQuery } from "@tanstack/react-query";
import { getSection } from "../../services/apiCourses";

export function useSection(courseId: string, sectionId: string) {
    const { isFetching, data: section, error, isError } = useQuery({
        queryKey: ["section", courseId, sectionId],
        queryFn: async () => await getSection(courseId, sectionId),
        throwOnError: true
    });

    return { isLoading: isFetching, section, error, isError };
}
