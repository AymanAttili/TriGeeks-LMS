import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateProfilePicture } from "../../services/apiUser";
import { useUser } from "./useUser";

export function useUpdateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {user: {profilePicture}} = useUser()

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: async (data, action) => {
        if(action === 'user'){
            // 
        }
        else{
            await updateProfilePicture(data, profilePicture.id);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    },
  });

  return { updateUser, isLoading: isPending };
}
