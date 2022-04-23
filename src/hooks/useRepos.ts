import { useQuery } from "react-query";
import { searchReposUrl } from "../helpers/endpoints";
import useAxios from "./useAxios";

export default function useRepos(searchQuery: string, searchType: string) {
  const config = {
    method: searchReposUrl.method,
    url: searchReposUrl.path,
    params: {
      q: `${searchQuery} ${searchType}`,
    },
  };
  const axiosInstance = useAxios();
  return useQuery<any, Error>(
    ["post", searchQuery],
    () => axiosInstance(config),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    }
  );
}
