import { useQuery } from "react-query";
import { searchReposUrl } from "../helpers/endpoints";
import useAxios from "./useAxios";

export default function useRepos(
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
  return useQuery<any, Error>(
    ["repos", searchQuery, page, itemsPerPage],
    () => axiosInstance(config),
    {
      staleTime: 300000, // 5min
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    }
  );
}
