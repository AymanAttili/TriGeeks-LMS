import { useQuery } from "@tanstack/react-query";

export function useQuestionsDraft() {
    const { isFetching, data: questionsDraft, error, isError, refetch } = useQuery({
        queryKey: ["questionsDraft"],
        queryFn: () => [],
        throwOnError: true
    });
    
    return { isLoading: isFetching, questionsDraft, error, isError, refetch };
}

