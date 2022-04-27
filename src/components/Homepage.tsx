import React, { useState } from "react";
import { searchMethods } from "../helpers/constants";
import useSearchRepos from "../hooks/useSearchRepos";
import useQueryParams from "../hooks/useQueryParams";
import { HomepageContext, RepoDataType, SearchParams } from "../types";
import { Outlet, useOutletContext } from "react-router-dom";

const Homepage: React.FC = () => {
  let [searchParams, setSearchParams] = useQueryParams<SearchParams>("search");
  const [selectedRepo, setSelectedRepo] = useState<RepoDataType | null>(null);

  if (!searchParams) {
    searchParams = {
      query: "",
      searchType: searchMethods.IN_NAME,
      page: 0,
      perPage: 25,
    };
  }

  const searchQueryRes = useSearchRepos(searchParams);

  return (
    <div className="homepage">
      <Outlet
        context={{
          selectedRepo,
          setSelectedRepo,
          queryParams: searchParams,
          setQueryParams: setSearchParams,
          searchQueryRes,
        }}
      />
    </div>
  );
};

export function useHomepageContext() {
  return useOutletContext<HomepageContext>();
}

export default Homepage;
