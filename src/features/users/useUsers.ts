import { useQuery } from "@tanstack/react-query";
import { searchPayload, searchUsers } from "../../services/apiUser";

const initialPayload: searchPayload = {
  page: 1,
  pageSize: 8
}

export function useUsers(payload = initialPayload) {
    const { isFetching, data: users, error, isError } = useQuery({
      queryKey: ["users", payload],
      queryFn: async() => await searchUsers(payload),
      throwOnError: true
    });
    
    return { isLoading: isFetching, users, error, isError };
  }
  