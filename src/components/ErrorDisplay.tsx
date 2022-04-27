import { AxiosError } from "axios";
import React from "react";
import OopsIcon from "../assets/oops.png";
import SadIcon from "../assets/sad.png";
import { ReactComponent as FileNotFound } from "../assets/file-x.svg";
import { Typography } from "@mui/material";

type ErrorDisplay = {
  isError: boolean;
  error: AxiosError<any, any> | null;
};

const ErrorDisplay: React.FC<ErrorDisplay> = ({ isError, error }) => {
  const errorContent = isError
    ? {
        string: `Error: ${error?.response?.data?.message || error?.message}`,
        icon: OopsIcon,
      }
    : { string: "Looks like nothing was found", icon: SadIcon };

  if (error?.response?.status === 404) {
    return (
      <div className="error-wrap">
        <FileNotFound />
        <Typography>ReadMe file not found</Typography>
      </div>
    );
  }

  return (
    <div className="error-wrap">
      <img src={errorContent.icon} alt="oops!" />
      <div className="error-wrap__error-message">{errorContent.string}</div>
    </div>
  );
};

export default ErrorDisplay;
