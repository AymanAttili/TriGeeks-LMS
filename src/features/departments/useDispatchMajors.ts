import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core";
import { addMajor, deleteMajor, editMajor } from "../../services/apiMajors";

type data = {
    payload: object,
    action: string
}

export function useDispatchMajors() {
    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const { mutate: majorsDispatch, isPending } = useMutation({
        mutationFn: async ({payload, action}: data) => {
            switch(action){
                case 'add': await addMajor(payload.departmentId,payload.name); break;
                case 'edit': await editMajor(payload.departmentId,payload.majorId, payload.name); break;
                case 'delete': await deleteMajor(payload.departmentId,payload.majorId); break;
                default: throw new Error('Unknown action')
            }
        },
        onSuccess: () => {
            notifications.show('Successful Majors action', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            
            queryClient.invalidateQueries({ queryKey: ['majors'] });
        },
        onError: (err) => {
            notifications.show(err.message, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { majorsDispatch, isLoading: isPending };
}
