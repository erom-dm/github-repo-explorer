import { useQuery } from "react-query";
import { searchReposUrl } from "../helpers/endpoints";
import useAxios from "./useAxios";
import { QueryObserverOptions } from "react-query/types/core/types";
import parse, { Links } from "parse-link-header";
import { AxiosError } from "axios";
import { SearchParams, SearchReposAxiosConfig } from "../types";

export default function useSearchRepos(searchParams: SearchParams) {
  const { query, searchType, page, perPage } = searchParams;
  const axiosInstance = useAxios();
  const config: SearchReposAxiosConfig = {
    method: searchReposUrl.method,
    url: searchReposUrl.path,
    params: {
      q: `${query} ${searchType}`,
      per_page: perPage,
      page: page + 1,
    },
  };
  const options: QueryObserverOptions<any, AxiosError> = {
    staleTime: 300000, // 5min
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    enabled: !!query,
  };

  const queryResult = useQuery<any, AxiosError>(
    ["repos", query, page, perPage],
    () => axiosInstance(config),
    options
  );

  // Prefetching next page if one exists
  const { data } = queryResult;
  const links: Links | null = parse(data?.headers?.link);
  const nextPage: number = Number(links?.next?.page);
  const { isIdle, data: prefetchedData } = useQuery<any, AxiosError>(
    ["repos", query, nextPage - 1, perPage],
    () =>
      axiosInstance({
        ...config,
        params: { ...config.params, page: nextPage },
      }),
    { enabled: !!nextPage, ...options }
  );

  return queryResult;
}
