import { useQuery } from "@tanstack/react-query";
import { getQuestion } from "../../services/apiQuizSession";

export function useCurrentQuestion(quizId: number, questionId: number) {
    const { isFetching, data: currentQuestion, error, isError } = useQuery({
        queryKey: ["currentQuestion", {quizId, questionId}],
        queryFn: async() => await getQuestion(quizId, questionId),
        throwOnError: true
    });

    return { isLoading: isFetching, currentQuestion, error, isError };
}
