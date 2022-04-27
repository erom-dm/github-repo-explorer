import React from "react";
import RepositoryCard from "./RepositoryCard";
import { RepoDataType } from "../types";
import { AxiosError } from "axios";
import ErrorDisplay from "./ErrorDisplay";

export type repoGridProps = {
  data: any;
  isError: boolean;
  error: AxiosError | null;
  isLoading: any;
  isFetching: boolean;
  itemsPerPage: number;
  setSelectedRepo: React.Dispatch<React.SetStateAction<RepoDataType | null>>;
};

const RepoGrid: React.FC<repoGridProps> = ({
  data,
  isError,
  error,
  isLoading,
  isFetching,
  itemsPerPage,
  setSelectedRepo,
}) => {
  const dataLoading = isFetching || isLoading;
  const dataLen = !!data?.data?.items.length;

  return (
    <div className="repo-grid">
      {isError || (data && !dataLen) ? (
        <ErrorDisplay isError={isError} error={error} />
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
                        setSelectedRepo={setSelectedRepo}
                      />
                    ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RepoGrid;
