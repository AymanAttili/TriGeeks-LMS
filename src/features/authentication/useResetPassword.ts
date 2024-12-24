import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordAPI, ResetPasswordPayload } from '../../services/apiAuth'
import { useNotifications } from "@toolpad/core";
import { useNavigate } from "react-router-dom";


export function useResetPassword() {
    const notifications = useNotifications();
    const navigate = useNavigate();

    const { mutateAsync: resetPassword, isPending, isError } = useMutation({
        mutationFn: (payload: ResetPasswordPayload) => resetPasswordAPI(payload),
        onSuccess: () => {
            notifications.show('Password updaed successfully ✅', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            navigate('/login', { replace: true });
        },
        onError: () =>{
            notifications.show('Something went wrong! 😕', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { resetPassword, isLoading: isPending, isError };
}
