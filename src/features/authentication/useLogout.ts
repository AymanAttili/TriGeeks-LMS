import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { revokeRefreshToken } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: logout, isPending } = useMutation({
    mutationFn: async () => {
      try{
        await revokeRefreshToken();
      }
      finally{
        queryClient.clear();
        navigate("/login", { replace: true })
      }
    },
  });

  return { logout, isLoading: isPending };
}
