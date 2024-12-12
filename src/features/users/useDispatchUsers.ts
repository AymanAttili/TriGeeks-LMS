import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core";
import { addUser, changePassword, deleteUser, editUser, searchUsers, updateProfilePicture, User } from "../../services/apiUser";
import axios, { AxiosError } from "axios";

type UserPayload = {
    id?: number
    user?: User
}

type UpdatePicturePayload = {
    file: any
}


type searchPayload = {
    page: number,
    pageSize: number
}

type changePasswordPayload = {
    currentPassword: string,
    newPassword: string
}

type data = {
    payload: UserPayload | searchPayload | UpdatePicturePayload | changePasswordPayload,
    action: string
}

export function useDispatchUsers() {
    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const { mutateAsync: usersDispatch, isPending, isError, error } = useMutation({
        mutationFn: async ({payload, action}: data) => {
            switch(action){
                case 'add': return await addUser(payload.user);
                case 'edit': return await editUser(payload.id, payload.user);
                case 'editProfilePic': {
                    const res = await updateProfilePicture(payload.file); 
                    if(!axios.isAxiosError(res))
                        queryClient.invalidateQueries({ queryKey: ['user'] }); 
                    return res;
                }
                case 'changePassword':{
                    return await changePassword(payload.currentPassword, payload.newPassword)
                }
                case 'delete': return await deleteUser(payload.id); 
                case 'search': return await searchUsers(payload); 
                default: throw new AxiosError('Unknown action')
            }
        },
        onSuccess: () => {
            notifications.show('Successful Users action', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            
            queryClient.invalidateQueries({ queryKey: ['users'] });
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

    return { usersDispatch, isLoading: isPending, isError, error };
}
