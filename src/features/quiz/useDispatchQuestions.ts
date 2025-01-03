import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotifications } from "@toolpad/core";
import { AxiosError } from "axios";
import { useQuestionsDraft} from "./useQuestionsDraft";

export const useDispatchQuestions = () => {
    const queryClient = useQueryClient();
    const notifications = useNotifications();
    const {questionsDraft} = useQuestionsDraft();

    const { mutateAsync: questionsDispatch, isPending, isError, error } = useMutation({
        mutationFn: async ({payload, action}) => {
            switch(action){
                case 'add': queryClient.setQueriesData({queryKey: ['questionsDraft']}, [...questionsDraft, ...payload.data]); break;
                case 'delete':queryClient.setQueriesData({queryKey: ['questionsDraft']}, questionsDraft.filter((_, index) => index !== payload.index)); break;
                case 'edit': queryClient.setQueriesData({queryKey: ['questionsDraft']}, questionsDraft.map((item, index) => index === payload.index ? payload.data : item)); break;
                case 'clear': queryClient.invalidateQueries({queryKey: ['questionsDraft']}); break;
                default: throw new AxiosError('Unknown action')
            }
        },
        onSuccess: () => {
            // notifications.show('Successful question action', {
            //     severity: 'success',
            //     autoHideDuration: 3000,
            // });
            
        },

        onError: (err) => {  
            let msg = err.message.response?.data?.title
            if(err.message.status === 400){
                msg = err.message?.response?.data?.errors?.LessThanValidator[0]
            }
            notifications.show(msg, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { questionsDispatch, isLoading: isPending, isError, error };
}