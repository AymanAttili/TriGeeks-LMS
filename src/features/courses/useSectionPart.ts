import { useQuery } from "@tanstack/react-query";
import { getSectionPart } from "../../services/apiCourses";

export function useSectionPart(sectionId: string, sectionPartId: string) {
    const { isFetching, data: sectionPart, error, isError } = useQuery({
        queryKey: ["sectionPart", sectionId, sectionPartId],
        queryFn: async () => await getSectionPart(sectionId, sectionPartId),
        throwOnError: true
    });

    return { isLoading: isFetching, sectionPart, error, isError };
}
