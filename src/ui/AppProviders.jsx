import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes in milliseconds
        },
    },
});

export const AppProviders = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        { children }
    </QueryClientProvider>
)