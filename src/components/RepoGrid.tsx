import React, { useEffect } from "react";
import useRepos from "../hooks/useRepos";
import TablePagination from "@mui/material/TablePagination";

export type repoGridProps = { searchQuery: string; searchType: string };

const RepoGrid: React.FC<repoGridProps> = ({ searchQuery, searchType }) => {
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(25);
  const { isLoading, isError, data, error, isFetching, isPreviousData } =
    useRepos(searchQuery, searchType, page, itemsPerPage);

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

  return (
    <div className="repo-grid">
      {isLoading ? (
        "Loading..."
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            {data?.data?.items.slice(0, itemsPerPage).map((el: any) => (
              <div key={el.id}>{el.name}</div>
            ))}
          </div>
          <TablePagination
            component="div"
            count={data?.data?.total_count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={itemsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {isFetching ? <div> Loading...</div> : null}
        </>
      )}
    </div>
  );
};

export default RepoGrid;
