import React, { useEffect } from "react";
import Searchbar from "./Searchbar";
import RepoGrid from "./RepoGrid";
import { searchMethods } from "../helpers/constants";
import TablePagination from "@mui/material/TablePagination";
import useSearchRepos from "../hooks/useSearchRepos";
import useQueryParams from "../hooks/useQueryParams";
import { SearchParams } from "../types";

const Homepage: React.FC = () => {
  let [queryParams, setQueryParams] = useQueryParams<SearchParams>("search");


  if (!queryParams) {
    queryParams = {
      query: "",
      searchType: searchMethods.IN_NAME,
      page: 0,
      perPage: 25,
    };
  }

  useEffect(() => {
    if (queryParams?.query) {
      setQueryParams({ ...(queryParams as SearchParams), page: 0 });
    }
  }, [queryParams.query]);

  const { isLoading, isError, data, error, isFetching, isPreviousData } =
    useSearchRepos(queryParams);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setQueryParams({ ...(queryParams as SearchParams), page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQueryParams({
      ...(queryParams as SearchParams),
      page: 0,
      perPage: parseInt(event.target.value, 10),
    });
  };

  return (
    <div className="homepage">
      <div className="homepage__searchbar-wrap">
        <Searchbar
          searchParams={queryParams}
          setSearchParams={setQueryParams}
        />
      </div>
      {queryParams.query && (
        <RepoGrid
          data={data}
          isError={isError}
          error={error}
          isFetching={isFetching}
          isLoading={isLoading}
          itemsPerPage={queryParams.perPage}
        />
      )}
      {data?.data && (
        <div className="homepage__pagination-wrap">
          <TablePagination
            component="div"
            count={data?.data?.total_count}
            page={queryParams.page}
            onPageChange={handleChangePage}
            rowsPerPage={queryParams.perPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;
