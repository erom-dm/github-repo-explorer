import { Endpoint } from "../types";

const GET = "GET";

// https://docs.github.com/en/rest/search#search-repositories
export const searchReposUrl: Endpoint = {
  method: GET,
  path: "/search/repositories",
};

export const getRepoURL = (
  owner: string = "",
  repo: string = ""
): Endpoint => ({
  method: GET,
  path: `/repos/${owner}/${repo}`,
});

export const getRepoContentURL = (
  owner: string = "",
  repo: string = "",
  contentPath: string
): Endpoint => ({
  method: GET,
  path: `/repos/${owner}/${repo}/contents/${contentPath}`,
});
