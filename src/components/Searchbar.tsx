import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { TextFieldChangeEvent } from "../types";
import useDebounce from "../hooks/useDebounce";

type repoGridProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const Searchbar: React.FC<repoGridProps> = ({ setSearchQuery }) => {
  const [state, setState] = useState<string>("");

  const handleChange = (e: TextFieldChangeEvent): void => {
    setState(e.target.value);
  };

  const debouncedInput = useDebounce(state, 500);
  useEffect(() => {
    if (debouncedInput) {
      setSearchQuery(debouncedInput);
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
