import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiUser";

export function useUser() {

  const { isFetching, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    throwOnError: true
  });

  return { isLoading: isFetching, user, isAuthenticated: user && true };
}
