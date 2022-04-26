import React from "react";
import RepoGrid from "./RepoGrid";
import TablePagination from "@mui/material/TablePagination";
import { SearchParams } from "../types";
import { UseQueryResult } from "react-query";
import { AxiosError } from "axios";
import { NavigateOptions } from "react-router";

type SearchResultsProps = {
  queryParams: SearchParams;
  searchQueryRes: UseQueryResult<any, AxiosError<any, any>>;
  setQueryParams: (
    newQuery: SearchParams,
    options?: NavigateOptions | undefined
  ) => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  queryParams,
  searchQueryRes,
  setQueryParams,
}) => {
  const { isLoading, isError, data, error, isFetching, isPreviousData } =
    searchQueryRes;
  const { page, perPage, query } = queryParams;

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
    <div className="search-results">
      {query && (
        <>
          <RepoGrid
            data={data}
            isError={isError}
            error={error}
            isFetching={isFetching}
            isLoading={isLoading}
            itemsPerPage={queryParams.perPage}
          />
          {data?.data && (
            <div className="search-results__pagination-wrap">
              <TablePagination
                component="div"
                count={data?.data?.total_count}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={perPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
