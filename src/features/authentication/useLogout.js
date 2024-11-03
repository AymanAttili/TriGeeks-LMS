import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: () => {
      queryClient.removeQueries();
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
