import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core";
import { addDepartment as addDepartmentAPI, deleteDepartment, editDepartment } from "../../services/apiDepartments";

type data = {
    payload: object,
    action: string
}

export function useDispatchDepartment() {
    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const { mutate: departmentDispatch, isPending } = useMutation({
        mutationFn: async ({payload, action}: data) => {
            switch(action){
                case 'add': await addDepartmentAPI(payload.name); break;
                case 'edit': await editDepartment(payload.id, payload.name); break;
                case 'delete': await deleteDepartment(payload.id); break;
                default: throw new Error('Unknown action')
            }
        },
        onSuccess: () => {
            notifications.show('Successful departments action', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            
            queryClient.invalidateQueries('departments');
        },
        onError: (err) => {
            notifications.show(err.message, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { departmentDispatch, isLoading: isPending };
}
