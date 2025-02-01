import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../services/apiUser";


export function useUsers(payload) {
    const { isFetching, data: users, error, isError } = useQuery({
      queryKey: ["users", payload],
      queryFn: async() => await searchUsers(payload),
      throwOnError: true
    });
    
    return { isLoading: isFetching, users, error, isError };
  }
  