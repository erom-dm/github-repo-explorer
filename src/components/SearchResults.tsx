import React from "react";
import RepoGrid from "./RepoGrid";
import TablePagination from "@mui/material/TablePagination";
import { SearchParams } from "../types";
import Searchbar from "./Searchbar";
import { useHomepageContext } from "./Homepage";

const SearchResults: React.FC = () => {
  const { queryParams, searchQueryRes, setQueryParams, setSelectedRepo } =
    useHomepageContext();
  const { isLoading, isError, data, error, isFetching } = searchQueryRes;
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
      <div className="search-results__search-bar-wrap">
        <Searchbar
          searchParams={queryParams}
          setSearchParams={setQueryParams}
        />
      </div>
      {query && (
        <>
          <RepoGrid
            data={data}
            isError={isError}
            error={error}
            isFetching={isFetching}
            isLoading={isLoading}
            itemsPerPage={queryParams.perPage}
            setSelectedRepo={setSelectedRepo}
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
