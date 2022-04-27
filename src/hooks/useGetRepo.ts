import { GetRepoAxiosConfig } from "../types";
import useAxios from "./useAxios";
import { getRepoURL } from "../helpers/endpoints";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import defaultQueryOptions from "../helpers/queryOptions";

export default function useGetRepo(
  repoDataPresent: boolean,
  owner?: string,
  repo?: string
) {
  const axiosInstance = useAxios();
  const endpoint = getRepoURL(owner, repo);
  const config: GetRepoAxiosConfig = {
    method: endpoint.method,
    url: endpoint.path,
  };

  const options = defaultQueryOptions();

  const queryResult = useQuery<any, AxiosError>(
    ["repo", owner, repo],
    () => axiosInstance(config),
    { ...options, enabled: !repoDataPresent && !!owner && !!repo }
  );

  return queryResult;
}
