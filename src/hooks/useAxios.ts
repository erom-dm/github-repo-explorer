import { useMemo } from "react";
import axios from "axios";

export default function useAxios(authToken = "") {
  /** @param authToken - GitHub personal Auth token
   *  Generate at:
   *  https://github.com/settings/tokens
   */
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: "https://api.github.com",
      timeout: 1000,
    });
  }, []);
  if (authToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${authToken}`;
  }
  axiosInstance.defaults.headers.common["Accept"] =
    "application/vnd.github.v3.text-match+json";

  return axiosInstance;
}
