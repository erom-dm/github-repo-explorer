import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import RepoGrid from "./RepoGrid";

const Homepage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (searchQuery) {
      console.log(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="homepage">
      <Searchbar setSearchQuery={setSearchQuery} />
      <RepoGrid />
    </div>
  );
};

export default Homepage;
