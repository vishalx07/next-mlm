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
import { transport } from "@repo/gen/grpc-client";
import { getErrorMessage } from "@repo/ui/utils";
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
      if (process.env.NODE_ENV !== "production") {
        console.log(data);
      }
      const result = z.object({ message: z.string() }).safeParse(data);
      if (result.success) {
        const { message } = result.data;
        toast.success(message);
      }
    },
  }),
});

function onError(err: unknown) {
  const error = getErrorMessage(err);
  toast.error(error);
}
