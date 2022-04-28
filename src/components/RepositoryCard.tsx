import React, { SyntheticEvent } from "react";
import { RepoDataType } from "../types";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from "@mui/material";
import truncateString from "../helpers/truncateString";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

export type repositoryCardProps = {
  repoData: RepoDataType;
  isLoading: boolean;
  setSelectedRepo?: React.Dispatch<React.SetStateAction<RepoDataType | null>>;
};

const RepositoryCard: React.FC<repositoryCardProps> = ({
  repoData,
  isLoading,
  setSelectedRepo,
}) => {
  const navigate = useNavigate();
  const {
    name,
    description,
    stargazers_count,
    language,
    created_at,
    updated_at,
    owner,
  } = repoData;

  const handleClick = (e: SyntheticEvent) => {
    if (isLoading) {
      return;
    }
    setSelectedRepo && setSelectedRepo(repoData);
    navigate(`/repository/:${owner.login}/:${name}`);
  };

  const formattedDescription = isLoading
    ? ""
    : truncateString(description, 200);
  const createdAt = isLoading ? "" : dayjs(created_at).format("DD/MM/YYYY");
  const updatedAt = isLoading ? "" : dayjs(updated_at).format("DD/MM/YYYY");

  return (
    <Card className="repo-card" variant="outlined" onClick={handleClick}>
      {isLoading ? (
        <CardContent>
          <Skeleton animation={"wave"} variant="text" width={200} height={25} />
          <Skeleton animation={"wave"} variant="text" width={100} height={18} />
        </CardContent>
      ) : (
        <CardHeader title={name} subheader={`Created: ${createdAt}`} />
      )}
      <CardContent className="repo-card__description-content">
        <Typography>
          {isLoading ? <Skeleton /> : formattedDescription}
        </Typography>
      </CardContent>

      <CardContent>
        {isLoading ? (
          <div className="repo-card__skeleton-bottom">
            <Skeleton variant="rectangular" width={44} height={44} />
            <div className="repo-card__skeleton-bottom-inner-left">
              <Skeleton variant="text" width={70} height={20} />
              <Skeleton variant="text" width={100} height={20} />
            </div>
            <div className="repo-card__skeleton-bottom-inner-right">
              <Skeleton variant="text" width={50} height={20} />
              <Skeleton variant="text" width={100} height={20} />
            </div>
          </div>
        ) : (
          <div className="repo-card__bottom-wrap">
            <div className="repo-card__owner-wrap">
              <Avatar
                alt={owner.login}
                src={owner?.avatar_url}
                variant="rounded"
                imgProps={{ loading: "lazy" }}
              />
              <div>
                <Typography variant="body2">
                  {`${stargazers_count}\u2605`}
                </Typography>
                <Typography variant="body2">{owner.login}</Typography>
              </div>
            </div>
            <div className="repo-card__info-wrap">
              <Typography variant="body2">{language}</Typography>
              <Typography variant="body2">{`Updated: ${updatedAt}`}</Typography>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RepositoryCard;
