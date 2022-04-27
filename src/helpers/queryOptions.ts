import { QueryObserverOptions } from "react-query/types/core/types";
import { AxiosError } from "axios";

export default function defaultQueryOptions(): QueryObserverOptions<
  any,
  AxiosError
> {
  return {
    staleTime: 300000, // 5min
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  };
}
