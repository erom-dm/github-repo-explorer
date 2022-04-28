import React, { SyntheticEvent, useState } from "react";
import { useHomepageContext } from "./Homepage";
import useGetRepoMDFile from "../hooks/useGetRepoReadmeFile";
import useGetRepo from "../hooks/useGetRepo";
import { useNavigate, useParams } from "react-router";
import { RepoDataType } from "../types";
import { marked } from "marked";
import truncateString from "../helpers/truncateString";
import dayjs from "dayjs";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Skeleton,
  Snackbar,
  Typography,
} from "@mui/material";
import GHIcon64px from "../assets/GitHub-Mark-64px.png";
import { ReactComponent as CopyIcon } from "../assets/copy.svg";
import { ReactComponent as BackIcon } from "../assets/arrow-back-up.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import useGetSimpleData from "../hooks/useGetSimpleData";
import UserAvatarGroup from "./UserAvatarGroup";
import ErrorDisplay from "./ErrorDisplay";

const RepoPage: React.FC = () => {
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  let { selectedRepo: repoData } = useHomepageContext();
  let { owner, repoName } = useParams<string>();
  const ownerNameC = owner ? owner.slice(1) : "";
  const repoNameC = repoName ? repoName.slice(1) : "";
  const navigate = useNavigate();

  // Will not fire if repoData is present
  let {
    isLoading,
    isError,
    data: fRepoData,
    error,
  } = useGetRepo(!!repoData, ownerNameC, repoNameC);

  // If data from context was absent, substitute it with freshly fetched one
  let data: RepoDataType = repoData ? repoData : fRepoData?.data;

  const readmeQueryRes = useGetRepoMDFile(ownerNameC, repoNameC, !!data);
  const { data: forksData } = useGetSimpleData(
    "forks",
    data?.forks_url,
    data?.id
  );
  const { data: contributorsData } = useGetSimpleData(
    "contributors",
    data?.contributors_url,
    data?.id
  );
  const { data: stargazersData } = useGetSimpleData(
    "stargazers",
    data?.stargazers_url,
    data?.id
  );

  // Parse README.md contents
  const readmeContent = readmeQueryRes?.data?.data?.content;
  const decodedReadmeContent = readmeContent ? window?.atob(readmeContent) : "";
  const parsedReadme = marked.parse(decodedReadmeContent);

  const handleBackButton = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!!repoData) {
      window.history.back();
      return;
    }
    navigate("/");
    return;
  };
  const handleOpenToast = () => {
    setToastOpen(true);
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  const actionElem = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleCopyToClipboard = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        handleOpenToast();
      })
      .catch((err) => console.error(err));
  };

  if (isError) {
    return (
      <div className="repo-page">
        <div className="repo-page__main-content-wrap">
          <ErrorDisplay isError={isError} error={error} />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="repo-page">
        <div className="repo-page__main-content-wrap">
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="repo-page">
      <div className="repo-page__header">
        <div className="repo-page__title-wrap-top">
          {isLoading ? (
            <div className="repo-page__title">
              <Skeleton variant="rectangular" width={450} height={72} />
              <Skeleton variant="text" width={600} height={24} />
            </div>
          ) : (
            <>
              <a
                className="repo-page__title"
                href={data.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={GHIcon64px} alt="GitHubLogo" />
                <Typography variant={"h2"}>{data.name}</Typography>
              </a>

              <Typography
                variant="body1"
                className="repo-page__repo-description"
              >
                {truncateString(data.description, 500) || "No description"}
              </Typography>
            </>
          )}
        </div>
        {isLoading ? (
          <div className="repo-page__title">
            <Skeleton variant="rectangular" width={160} height={40} />
          </div>
        ) : (
          <div className="repo-page__title-buttons">
            <Button
              variant={"contained"}
              onClick={handleBackButton}
              startIcon={<BackIcon />}
              color="primary"
            >
              Back to Search
            </Button>
            <Button
              variant={"outlined"}
              onClick={() => handleCopyToClipboard(data.clone_url)}
              startIcon={<CopyIcon />}
              color="primary"
            >
              Git Clone URL
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={toastOpen}
              autoHideDuration={5000}
              onClose={handleClose}
              message="Link copied to clipboard"
              action={actionElem}
            />
          </div>
        )}
      </div>
      <Divider sx={{ margin: "15px 0" }} />
      <div className="repo-page__main-content-wrap">
        {readmeQueryRes.isLoading && (
          <Skeleton variant="rectangular" width={750} height={250} />
        )}
        {readmeQueryRes.isError ? (
          <div className="repo-page__error">
            <ErrorDisplay isError={true} error={readmeQueryRes.error} />
          </div>
        ) : (
          <div
            className="repo-page__readme-content"
            dangerouslySetInnerHTML={{
              __html: parsedReadme,
            }}
          />
        )}
        <Divider orientation="vertical" />
        <div className="repo-page__sidebar-wrap">
          {isLoading ? (
            <>
              <Skeleton variant="rectangular" width={220} height={40} />
              <Skeleton variant="text" />
              <Skeleton variant="rectangular" width={220} height={40} />
              <Skeleton variant="text" />
              <Skeleton variant="rectangular" width={220} height={40} />
            </>
          ) : (
            <>
              <a
                className="repo-page__owner-link"
                href={data.owner.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="repo-page__owner-wrap">
                  <Avatar
                    alt={data.owner.login}
                    src={data.owner?.avatar_url}
                    variant="rounded"
                    imgProps={{ loading: "lazy" }}
                  />
                  <Typography variant="body1" className="repo-page__owner-name">
                    {data.owner.login}
                  </Typography>
                </div>
              </a>
              {contributorsData?.data?.length && (
                <UserAvatarGroup
                  data={contributorsData?.data}
                  title={"Contributors"}
                />
              )}
              <div>{`\u2605${data.stargazers_count || 0}`}</div>
              {data.language && <div>{`Language: ${data.language}`}</div>}
              {data.homepage && (
                <Typography>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={data.homepage}
                  >
                    Homepage
                  </a>
                </Typography>
              )}
              {data.open_issues && (
                <Typography>{`Open issues: ${data.open_issues}`}</Typography>
              )}
              {data.created_at && (
                <Typography>{`Created: ${dayjs(data.created_at).format(
                  "DD/MM/YYYY"
                )}`}</Typography>
              )}
              {data.updated_at && (
                <Typography>{`Updated: ${dayjs(data.updated_at).format(
                  "DD/MM/YYYY"
                )}`}</Typography>
              )}
              {stargazersData?.data?.length && (
                <UserAvatarGroup
                  data={stargazersData?.data}
                  title={"Stargazers"}
                />
              )}
              {forksData?.data && (
                <Accordion className="repo-page__sidebar-forks">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{`Forks: ${data.forks_count}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul className="forks-list">
                      {forksData?.data?.length &&
                        forksData?.data
                          ?.slice(0, 10)
                          .map((fork: RepoDataType) => {
                            return (
                              <li key={fork.id}>
                                <a
                                  href={fork.html_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {fork.full_name.split("/")[0]}
                                </a>
                              </li>
                            );
                          })}
                      {forksData?.data?.length > 10 && (
                        <a
                          href={data.html_url + "/network/members"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ...and many more!
                        </a>
                      )}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepoPage;
