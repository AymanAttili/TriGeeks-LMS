import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordAPI } from '../../services/apiAuth'
import { useNotifications } from "@toolpad/core";

export function useForgotPassword() {
    const notifications = useNotifications();

    const { mutateAsync: forgotPassword, isPending, isError } = useMutation({
        mutationFn: (workId: string) => forgotPasswordAPI(workId),
        onError: () =>{
            notifications.show('Please verify if the work ID is correct', {
                severity: 'warning',
                autoHideDuration: 3000,
            });
        }
    });

    return { forgotPassword, isLoading: isPending, isError };
}
