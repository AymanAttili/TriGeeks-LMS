import { useQuery } from "@tanstack/react-query";

export function useQuestionsLocalStorage() {
    const { isFetching, data: questionsDraft, error, isError, refetch } = useQuery({
        queryKey: ["questionsDraft"],
        queryFn: () => {
            return JSON.parse(localStorage.getItem('questionsDraft') || '') || []
        },
        throwOnError: true
    });
    
    return { isLoading: isFetching, questionsDraft, error, isError, refetch };
}
