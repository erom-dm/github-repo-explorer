import React from "react";
import RepoGrid from "./RepoGrid";
import TablePagination from "@mui/material/TablePagination";
import { SearchParams } from "../types";
import Searchbar from "./Searchbar";
import { useHomepageContext } from "./Homepage";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { SearchMethod, searchMethods } from "../helpers/constants";

const SearchResults: React.FC = () => {
  const { queryParams, searchQueryRes, setQueryParams, setSelectedRepo } =
    useHomepageContext();

  const { isLoading, isError, data, error, isFetching } = searchQueryRes;
  const { page, perPage, query } = queryParams;

  const handleSearchTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: SearchMethod
  ) => {
    if (newType !== null) {
      setQueryParams({
        ...(queryParams as SearchParams),
        searchType: newType,
        page: 0,
      });
    }
  };
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
        <ToggleButtonGroup
          value={queryParams.searchType}
          exclusive
          onChange={handleSearchTypeChange}
          aria-label="text alignment"
          size={"small"}
        >
          <ToggleButton value={searchMethods.IN_NAME}>Name</ToggleButton>
          <ToggleButton value={searchMethods.IN_DESCRIPTION}>
            Description
          </ToggleButton>
          <ToggleButton value={searchMethods.IN_README}>Readme</ToggleButton>
          <ToggleButton value={searchMethods.IN_OWNER_OR_NAME}>
            Owner/Name
          </ToggleButton>
        </ToggleButtonGroup>
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
