import React, { useState } from "react";
import Searchbar from "./Searchbar";
import RepoGrid from "./RepoGrid";
import { searchMethods, SearchMethodValueTypes } from "../helpers/constants";

const Homepage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<SearchMethodValueTypes>(
    searchMethods.IN_DESCRIPTION
  );

  return (
    <div className="homepage">
      <Searchbar setSearchQuery={setSearchQuery} />
      {searchQuery && (
        <RepoGrid searchQuery={searchQuery} searchType={searchType} />
      )}
    </div>
  );
};

export default Homepage;
