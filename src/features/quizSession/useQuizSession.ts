import { useQuery } from "@tanstack/react-query";
import { getQuizSession } from "../../services/apiQuizSession";

export function useQuizSession(quizId: string) {
    const { isFetching, data: quizSession, error, isError } = useQuery({
        queryKey: ["quizSession", quizId],
        queryFn: async() => (await getQuizSession(quizId)).data,
        throwOnError: true,
    });

    return { isLoading: isFetching, quizSession, error, isError };
}
