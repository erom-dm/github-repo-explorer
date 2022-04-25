import { useQuery } from "react-query";
import { searchReposUrl } from "../helpers/endpoints";
import useAxios from "./useAxios";
import { QueryObserverOptions } from "react-query/types/core/types";
import parse, { Links } from "parse-link-header";
import { AxiosError } from "axios";

export default function useSearchRepos(
  searchQuery: string,
  searchType: string,
  page: number,
  itemsPerPage: number
) {
  const axiosInstance = useAxios();
  const config = {
    method: searchReposUrl.method,
    url: searchReposUrl.path,
    params: {
      q: `${searchQuery} ${searchType}`,
      per_page: itemsPerPage,
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
  };

  const queryResult = useQuery<any, AxiosError>(
    ["repos", searchQuery, page, itemsPerPage],
    () => axiosInstance(config),
    options
  );

  // Prefetching next page if one exists
  const { data } = queryResult;
  const links: Links | null = parse(data?.headers?.link);
  const nextPage: number = Number(links?.next?.page);
  const { isIdle, data: prefetchedData } = useQuery<any, AxiosError>(
    ["repos", searchQuery, nextPage - 1, itemsPerPage],
    () =>
      axiosInstance({
        ...config,
        params: { ...config.params, page: nextPage },
      }),
    { enabled: !!nextPage, ...options }
  );

  return queryResult;
}
