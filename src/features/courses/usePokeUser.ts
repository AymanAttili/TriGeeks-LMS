import { useMutation } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core";
import { pokeUser as pokeUserAPI } from "../../services/apiCourses";

export function usePokeUser() {
    const notifications = useNotifications();

    const { mutateAsync: pokeUser, isPending, data, error, isError, isSuccess, context } = useMutation({
        mutationFn: async ({courseId, userId}) => {
            return await pokeUserAPI(courseId, userId)
        },
        onSuccess: (res) => {
            notifications.show('Successful courses action', {
                severity: 'success',
                autoHideDuration: 3000,
            });
        },

        onError: (err) => {     
            notifications.show(err.message?.response?.data?.errors?.PredicateValidator[0] || err.message.response?.data?.title, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }
    )
    return { pokeUser, isLoading: isPending, error, isError};
}