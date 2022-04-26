import React from "react";
import RepositoryCard from "./RepositoryCard";
import { RepoDataType } from "../types";
import { AxiosError } from "axios";
import OopsIcon from "../assets/oops.png";
import SadIcon from "../assets/sad.png";

export type repoGridProps = {
  data: any;
  isError: boolean;
  error: AxiosError | null;
  isLoading: any;
  isFetching: boolean;
  itemsPerPage: number;
};

const RepoGrid: React.FC<repoGridProps> = ({
  data,
  isError,
  error,
  isLoading,
  isFetching,
  itemsPerPage,
}) => {
  const dataLoading = isFetching || isLoading;
  const dataLen = !!data?.data?.items.length;
  const errorContent = isError
    ? {
        string: `Error: ${error?.response?.data?.message || error?.message}`,
        icon: OopsIcon,
      }
    : { string: "Looks like nothing was found", icon: SadIcon };

  return (
    <div className="repo-grid">
      {isError || (data && !dataLen) ? (
        <div className="repo-grid__error-wrap">
          <img src={errorContent.icon} alt="oops!" />
          <div className="repo-grid__error-message">{errorContent.string}</div>
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
        </>
      )}
    </div>
  );
};

export default RepoGrid;
