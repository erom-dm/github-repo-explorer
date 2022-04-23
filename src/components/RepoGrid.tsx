import React from "react";
import useRepos from "../hooks/useRepos";

export type repoGridProps = { searchQuery: string; searchType: string };

const RepoGrid: React.FC<repoGridProps> = ({ searchQuery, searchType }) => {
  const { status, data, error, isFetching } = useRepos(searchQuery, searchType);
  console.dir(data);
  return (
    <div className="repo-grid">
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            {data.data.items.map((el: any) => (
              <div key={el.id}>{el.name}</div>
            ))}
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
};

export default RepoGrid;
