import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core";
import { addDepartment, deleteDepartment, editDepartment, getDepartment } from "../../services/apiDepartments";

type data = {
    payload: object,
    action: string
}

export function useDispatchDepartment() {
    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const { mutate: departmentDispatch, isPending, data } = useMutation({
        mutationFn: async ({payload, action}: data) => {
            switch(action){
                case 'add': await addDepartment(payload.name); break; 
                case 'edit': await editDepartment(payload.id, payload.name); break; 
                case 'delete': await deleteDepartment(payload.id); break;
                case 'get': return await getDepartment(payload.id)
                default: throw new Error('Unknown action')
            }
        },
        onSuccess: (res) => {
            if(!res){
                notifications.show('Successful departments action', {
                    severity: 'success',
                    autoHideDuration: 3000,
                });
                queryClient.invalidateQueries({ queryKey: ['departments'] });
            }

            return res;
        },
        onError: (err) => {
            notifications.show(err.message, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { departmentDispatch, isLoading: isPending, department: data };
}
