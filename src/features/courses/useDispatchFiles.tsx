import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core";
import { addFile, deleteFile, editFile, getFile } from "../../services/apiFiles";

type data = {
    payload: object,
    action: string
}

export function useDispatchFiles() {
    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const { mutateAsync: filesDispatch, isPending, data, isError, error } = useMutation({
        mutationFn: async ({ payload, action }: data) => {
            switch (action) {
                case 'add': await addFile(payload.file); break;
                case 'edit': await editFile(payload.id, payload.file); break;
                case 'delete': await deleteFile(payload.id); break;
                case 'get': return await getFile(payload.id)
                default: throw new Error('Unknown action')
            }
        },
        onSuccess: (res) => {
            if (!res) {
                notifications.show('Successful files action', {
                    severity: 'success',
                    autoHideDuration: 3000,
                });
                queryClient.invalidateQueries();
            }

            return res;
        },
        onError: (err) => {
            notifications.show(err.message.response?.data?.title, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    });

    return { filesDispatch, isLoading: isPending, file: data, isError, error };
}
