import React from "react";
import { AxiosError, Method } from "axios";
import { NavigateOptions } from "react-router";
import { UseQueryResult } from "react-query";

export type TextFieldChangeEvent = React.ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement
>;

export interface SearchParams {
  query: string;
  searchType: string;
  page: number;
  perPage: number;
}

export interface SearchReposAxiosConfig {
  method: Method | undefined;
  url: string;
  params: {
    q: string;
    page: number;
    per_page: number;
  };
}

export interface GetRepoAxiosConfig {
  method: Method | undefined;
  url: string;
}

export interface HomepageContext {
  selectedRepo: RepoDataType | null;
  setSelectedRepo: React.Dispatch<React.SetStateAction<RepoDataType | null>>;
  queryParams: SearchParams;
  setQueryParams: (
    newQuery: SearchParams,
    options?: NavigateOptions | undefined
  ) => void;
  searchQueryRes: UseQueryResult<any, AxiosError<any, any>>;
}

export interface Endpoint {
  method: Method | undefined;
  path: string;
}

export interface RepoDataType {
  allow_forking: boolean;
  stargazers_count: number;
  is_template: boolean;
  pushed_at: string;
  subscription_url: string;
  language: string;
  branches_url: string;
  issue_comment_url: string;
  labels_url: string;
  score: number;
  subscribers_url: string;
  releases_url: string;
  svn_url: string;
  id: number;
  forks: number;
  archive_url: string;
  git_refs_url: string;
  forks_url: string;
  visibility: string;
  statuses_url: string;
  ssh_url: string;
  license: LicenseType;
  full_name: string;
  size: number;
  languages_url: string;
  html_url: string;
  collaborators_url: string;
  clone_url: string;
  name: string;
  pulls_url: string;
  default_branch: string;
  hooks_url: string;
  trees_url: string;
  tags_url: string;
  private: boolean;
  contributors_url: string;
  has_downloads: boolean;
  notifications_url: string;
  open_issues_count: number;
  description: string;
  created_at: string;
  watchers: number;
  keys_url: string;
  deployments_url: string;
  has_projects: boolean;
  archived: boolean;
  has_wiki: boolean;
  updated_at: string;
  comments_url: string;
  stargazers_url: string;
  disabled: boolean;
  git_url: string;
  has_pages: boolean;
  owner: OwnerType;
  commits_url: string;
  compare_url: string;
  git_commits_url: string;
  topics: any[];
  blobs_url: string;
  git_tags_url: string;
  merges_url: string;
  downloads_url: string;
  has_issues: boolean;
  url: string;
  contents_url: string;
  mirror_url: null;
  milestones_url: string;
  teams_url: string;
  fork: boolean;
  issues_url: string;
  events_url: string;
  issue_events_url: string;
  text_matches: TextMatchesType;
  assignees_url: string;
  open_issues: number;
  watchers_count: number;
  node_id: string;
  homepage: string;
  forks_count: number;
}

export interface LicenseType {
  name: string;
  spdx_id: string;
  key: string;
  url: string;
  node_id: string;
}

export interface OwnerType {
  gists_url: string;
  repos_url: string;
  following_url: string;
  starred_url: string;
  login: string;
  followers_url: string;
  type: string;
  url: string;
  subscriptions_url: string;
  received_events_url: string;
  avatar_url: string;
  events_url: string;
  html_url: string;
  site_admin: boolean;
  id: number;
  gravatar_id: string;
  node_id: string;
  organizations_url: string;
}

export interface TextMatchesType {
  fragment: string;
  object_url: string;
  object_type: string;
  property: string;
  matches: { indices: number[]; text: string }[];
}
