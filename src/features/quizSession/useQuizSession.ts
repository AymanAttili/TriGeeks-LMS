import { useQuery } from "@tanstack/react-query";
import { getQuizSession } from "../../services/apiQuizSession";

export function useQuizSession(quizId: number) {
    const { isFetching, data: quizSession, error, isError } = useQuery({
        queryKey: ["quizSession", {quizId}],
        queryFn: async() => await getQuizSession(quizId),
        throwOnError: true
    });

    return { isLoading: isFetching, quizSession, error, isError };
}
