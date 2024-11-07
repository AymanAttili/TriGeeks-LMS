import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { clearTokens } from "../../utils/handleTokens";
import { revokeRefreshToken } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: async () => {
      await revokeRefreshToken();
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
