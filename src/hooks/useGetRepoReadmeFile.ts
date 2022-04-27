import useAxios from "./useAxios";
import { getRepoContentURL } from "../helpers/endpoints";
import { GetRepoAxiosConfig } from "../types";
import { QueryObserverOptions } from "react-query/types/core/types";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import defaultQueryOptions from "../helpers/queryOptions";
import { useCallback } from "react";

export default function useGetRepoReadmeFile(
  owner?: string,
  repo?: string,
  generalRepoData?: boolean
) {
  /**
   *
   * @param owner: string, for url construction
   * @param repo: string, for url construction
   * @param generalRepoData: main repo data object, to work as a dependency for fetching readme file. File will be fetched only after repo data is loaded.
   *
   *  Two queries.
   *  First tries to get md file from .../README.md route
   *  If first query produces 404 error, second query tries to get file from lowercase route .../README.md
   */

  const axiosInstance = useAxios();
  const endpoint1 = getRepoContentURL(owner, repo, "README.md");
  const endpoint2 = getRepoContentURL(owner, repo, "readme.md");
  const config1: GetRepoAxiosConfig = {
    method: endpoint1.method,
    url: endpoint1.path,
  };
  const config2: GetRepoAxiosConfig = {
    method: endpoint2.method,
    url: endpoint2.path,
  };

  const retryQueryFunc = useCallback(
    (failureCount: number, error: AxiosError) => {
      return !(error.response?.status === 404 || failureCount > 2);
    },
    []
  );
  const options1: QueryObserverOptions<any, AxiosError> = defaultQueryOptions();

  const queryResult1 = useQuery<any, AxiosError>(
    ["README", owner, repo],
    () => axiosInstance(config1),
    {
      ...options1,
      enabled: generalRepoData && !!owner && !!repo,
      retry: retryQueryFunc,
    }
  );

  const { isError, error } = queryResult1;
  const options2: QueryObserverOptions<any, AxiosError> = defaultQueryOptions();

  const queryResult2 = useQuery<any, AxiosError>(
    ["readme", owner, repo],
    () => axiosInstance(config2),
    {
      ...options2,
      enabled: isError && error?.response?.status === 404,
      retry: retryQueryFunc,
    }
  );

  if (queryResult1?.data) {
    return queryResult1;
  }
  return queryResult2;
}
