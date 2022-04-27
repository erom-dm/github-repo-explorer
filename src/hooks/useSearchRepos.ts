import { useQuery } from "react-query";
import { searchReposUrl } from "../helpers/endpoints";
import useAxios from "./useAxios";
import parse, { Links } from "parse-link-header";
import { AxiosError } from "axios";
import { SearchParams, SearchReposAxiosConfig } from "../types";
import defaultQueryOptions from "../helpers/queryOptions";

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

  const options = defaultQueryOptions();

  const queryResult = useQuery<any, AxiosError>(
    ["repos", query, page, perPage],
    () => axiosInstance(config),
    { ...options, enabled: !!query }
  );

  // Prefetching next page if one exists
  const { data } = queryResult;
  const links: Links | null = parse(data?.headers?.link);
  const nextPage: number = Number(links?.next?.page);
  const nextPageData = useQuery<any, AxiosError>(
    ["repos", query, nextPage - 1, perPage],
    () =>
      axiosInstance({
        ...config,
        params: { ...config.params, page: nextPage },
      }),
    { ...options, enabled: !!nextPage }
  );

  return queryResult;
}
