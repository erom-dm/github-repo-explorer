import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { SearchParams, TextFieldChangeEvent } from "../types";
import useDebounce from "../hooks/useDebounce";
import { NavigateOptions } from "react-router";

type repoGridProps = {
  searchParams: SearchParams;
  setSearchParams: (
    newQuery: SearchParams,
    options?: NavigateOptions | undefined
  ) => void;
};

const Searchbar: React.FC<repoGridProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const [state, setState] = useState<string>(searchParams.query || "");

  const handleChange = (e: TextFieldChangeEvent): void => {
    setState(e.target.value);
  };

  const debouncedInput = useDebounce(state, 500);
  useEffect(() => {
    if (debouncedInput) {
      setSearchParams({ ...searchParams, query: debouncedInput });
    }
  }, [debouncedInput]);

  return (
    <div className="searchbar">
      <TextField
        id="standard-search"
        label="Find repo"
        type="search"
        variant="standard"
        value={state}
        onChange={handleChange}
        fullWidth
      />
    </div>
  );
};

export default Searchbar;
