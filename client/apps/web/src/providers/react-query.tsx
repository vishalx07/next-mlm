import { TransportProvider } from "@connectrpc/connect-query";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as z from "zod/v4";
import { toast } from "@jamsr-ui/react";
import { transport } from "@repo/gen/lib/grpc-client";
import { convertToMilliseconds } from "@repo/ui/utils/time";

type Props = {
  children: React.ReactNode;
};

export const ReactQueryProvider = ({ children }: Props) => {
  return (
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </TransportProvider>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: convertToMilliseconds(5, "minute"),
      retry: 0,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    },
  },
  mutationCache: new MutationCache({
    onError: (error) => onError(error),
    onSuccess(data) {
      const result = z.object({ message: z.string() }).safeParse(data);
      if (result.success) {
        const { message } = result.data;
        toast.success(message);
      }
    },
  }),
});

function onError(error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }
  toast.error("Something went wrong");
}
