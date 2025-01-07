import { useQuery } from "@tanstack/react-query";
import { getCourseParticipants } from "../../services/apiCourses";

export function useCourseParticipants({courseId, page, filter}) {

    const { isFetching, data: participants, error, isError } = useQuery({
        queryKey: ["participants", courseId, page, filter],
        queryFn: async () => (await getCourseParticipants(courseId,page,filter)).data,
    });

    return { isLoading: isFetching, participants, error, isError };
}
