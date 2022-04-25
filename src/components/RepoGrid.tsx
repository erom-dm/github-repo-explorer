import React, { useEffect } from "react";
import useSearchRepos from "../hooks/useSearchRepos";
import TablePagination from "@mui/material/TablePagination";
import RepositoryCard from "./RepositoryCard";
import { RepoDataType } from "../types";
import OopsIcon from "../assets/oops.png";

export type repoGridProps = { searchQuery: string; searchType: string };

const RepoGrid: React.FC<repoGridProps> = ({ searchQuery, searchType }) => {
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(25);
  const { isLoading, isError, data, error, isFetching, isPreviousData } =
    useSearchRepos(searchQuery, searchType, page, itemsPerPage);

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dataLoading = isFetching || isLoading;

  return (
    <div className="repo-grid">
      {isError ? (
        <div className="repo-grid__error-wrap">
          <img src={OopsIcon} alt="oops!" />
          <div className="repo-grid__error-message">
            Error: {error?.response?.data?.message || error?.message}
          </div>
        </div>
      ) : (
        <>
          <div className="repo-grid__wrap">
            <div className="repo-grid__content">
              {dataLoading
                ? Array.from(Array(itemsPerPage), (_, i) => (
                    <RepositoryCard
                      isLoading={dataLoading}
                      repoData={{} as RepoDataType}
                      key={i}
                    />
                  ))
                : data?.data?.items
                    .slice(0, itemsPerPage)
                    .map((el: any) => (
                      <RepositoryCard
                        isLoading={dataLoading}
                        repoData={el}
                        key={el.id}
                      />
                    ))}
            </div>
          </div>
          <div className="repo-grid__controls">
            {data?.data && (
              <TablePagination
                component="div"
                count={data?.data?.total_count}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={itemsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RepoGrid;
