import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../services/apiUser";

export function useUsers(payload) {

    const { isFetching, data: users  } = useQuery({
      queryKey: ["users", payload],
      queryFn: async() => {return await searchUsers(payload)},
      throwOnError: true
    });
    
    return { isLoading: isFetching, users };
  }
  