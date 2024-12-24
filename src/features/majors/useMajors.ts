import { useQuery } from "@tanstack/react-query";
import { getMajors } from "../../services/apiMajors";

export function useMajors(departmentId: number) {

    const { isFetching, data: majors, error, isError } = useQuery({
        queryKey: ["majors", departmentId],
        queryFn: async () => {   
            if(departmentId)             
                return await getMajors(departmentId)
            return []       
        },
    });

    return { isLoading: isFetching, majors, error, isError };
}
