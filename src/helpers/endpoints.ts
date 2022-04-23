import { Endpoint } from "../types";

const GET = "GET";

// https://docs.github.com/en/rest/search#search-repositories
export const searchReposUrl: Endpoint = {
  method: GET,
  path: "/search/repositories",
};
