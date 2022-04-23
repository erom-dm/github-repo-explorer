import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import RepoGrid from "./RepoGrid";
import useAxios from "../hooks/useAxios";
import { searchReposUrl } from "../helpers/endpoints";

const IN_NAME = "in:name";
const IN_DESCRIPTION = "in:description";
const IN_README = "in:readme";
const IN_OWNER_NAME = "in:owner/name";

const Homepage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>(IN_NAME);


  const axiosInstance = useAxios();

  useEffect(() => {
    if (searchQuery) {
      console.log(searchQuery);
      axiosInstance({
        method: searchReposUrl.method,
        url: searchReposUrl.path,
        params: {
          q: `${searchQuery} ${searchType}`,
        },
      })
        .then((res) => console.dir(res))
        .catch((err) => console.error(err));
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
