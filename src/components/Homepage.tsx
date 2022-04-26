import React from "react";
import Searchbar from "./Searchbar";
import { searchMethods } from "../helpers/constants";
import useSearchRepos from "../hooks/useSearchRepos";
import useQueryParams from "../hooks/useQueryParams";
import { SearchParams } from "../types";
import SearchResults from "./SearchResults";

const Homepage: React.FC = () => {
  let [queryParams, setQueryParams] = useQueryParams<SearchParams>("search");
  if (!queryParams) {
    queryParams = {
      query: "",
      searchType: searchMethods.IN_NAME,
      page: 0,
      perPage: 25,
    };
  }

  const searchQueryRes = useSearchRepos(queryParams);

  return (
    <div className="homepage">
      <div className="homepage__searchbar-wrap">
        <Searchbar
          searchParams={queryParams}
          setSearchParams={setQueryParams}
        />
      </div>
      <SearchResults
        queryParams={queryParams}
        searchQueryRes={searchQueryRes}
        setQueryParams={setQueryParams}
      />
    </div>
  );
};

export default Homepage;
