import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { answerQuestion, finishQuiz, startQuiz } from "../../services/apiQuizSession";
import { useNotifications } from "@toolpad/core";

export function useDispatchQuiz() {
    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const { mutateAsync: quizDispatch, isPending, isError, error } = useMutation({
        mutationFn: async ({payload, action}) => {
            switch(action){
                case 'start': return await startQuiz(payload.quizId);
                case 'finish': return await finishQuiz(payload.quizId);
                case 'submitAnswer': return await answerQuestion(payload.quizId, payload.questionId, payload.answer);
                default: throw new AxiosError('Unknown action')
            }
        },
        onSuccess: () => {
            // notifications.show('Successful quiz action', {
            //     severity: 'success',
            //     autoHideDuration: 3000,
            // });
            
            queryClient.invalidateQueries({ queryKey: ['quizSession'] });
            queryClient.invalidateQueries({ queryKey: ['currentQuestion'] });
        },

        onError: (err) => {  
            let msg = err.message.response?.data?.title
            if(err.message.status === 400){
                msg = err.message?.response?.data?.errors?.LessThanValidator  && err.message?.response?.data?.errors?.LessThanValidator[0]
            }
            notifications.show(msg, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { quizDispatch, isLoading: isPending, isError, error };
}
