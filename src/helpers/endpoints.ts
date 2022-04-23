import { endpoint } from "../types";

const GET = "GET";

// https://docs.github.com/en/rest/search#search-repositories
export const searchReposUrl: endpoint = {
  method: GET,
  path: "/search/repositories",
};
