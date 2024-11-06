import { QueryClient, QueryCache } from "@tanstack/react-query";
import { extractErrorMessage } from "../utils/errorHandling";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            const errorMessage = extractErrorMessage(error);
            console.error(`Something went wrong: ${errorMessage}`);
        },
    }),
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 60 * 1000,
        },
    },
});

export default queryClient;