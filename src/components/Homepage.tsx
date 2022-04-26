import React, { useEffect } from "react";
import Searchbar from "./Searchbar";
import RepoGrid from "./RepoGrid";
import { searchMethods } from "../helpers/constants";
import TablePagination from "@mui/material/TablePagination";
import useSearchRepos from "../hooks/useSearchRepos";
import useQueryParams from "../hooks/useQueryParams";
import { SearchParams } from "../types";

const Homepage: React.FC = () => {
  let [searchParams, setSearchParams] = useQueryParams<SearchParams>("search");

  if (!searchParams) {
    searchParams = {
      query: "",
      searchType: searchMethods.IN_DESCRIPTION,
      page: 0,
      perPage: 25,
    };
  }

  useEffect(() => {
    if (searchParams?.query) {
      setSearchParams(
        { ...(searchParams as SearchParams), page: 0 },
        { replace: true }
      );
    }
  }, [searchParams.query]);

  const { isLoading, isError, data, error, isFetching, isPreviousData } =
    useSearchRepos(searchParams);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchParams(
      { ...(searchParams as SearchParams), page: newPage },
      { replace: true }
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchParams(
      {
        ...(searchParams as SearchParams),
        page: 0,
        perPage: parseInt(event.target.value, 10),
      },
      { replace: true }
    );
  };

  return (
    <div className="homepage">
      <Searchbar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      {searchParams.query && (
        <RepoGrid
          data={data}
          isError={isError}
          error={error}
          isFetching={isFetching}
          isLoading={isLoading}
          itemsPerPage={searchParams.perPage}
        />
      )}
      {data?.data && (
        <div className="repo-grid__controls">
          <TablePagination
            component="div"
            count={data?.data?.total_count}
            page={searchParams.page}
            onPageChange={handleChangePage}
            rowsPerPage={searchParams.perPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;
