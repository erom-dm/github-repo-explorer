import useAxios from "./useAxios";
import { GetRepoAxiosConfig } from "../types";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import defaultQueryOptions from "../helpers/queryOptions";

export default function useGetSimpleData(
  key: string,
  forksUrl: string,
  id: number
) {
  const axiosInstance = useAxios();
  const config: GetRepoAxiosConfig = {
    method: "GET",
    url: forksUrl,
  };
  const options = defaultQueryOptions();

  const queryResult = useQuery<any, AxiosError>(
    [key, id],
    () => axiosInstance(config),
    { ...options, retry: !!forksUrl }
  );

  return queryResult;
}
