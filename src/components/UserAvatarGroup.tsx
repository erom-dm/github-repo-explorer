import { OwnerType } from "../types";
import { Avatar, AvatarGroup, Link, Tooltip, Typography } from "@mui/material";
import React from "react";

type UserAvatarGroupProps = {
  data: OwnerType[];
  title: string;
};

const UserAvatarGroup: React.FC<UserAvatarGroupProps> = ({ data, title }) => {
  return (
    <div>
      <Typography>{title + ":"}</Typography>
      <AvatarGroup max={6} total={data.length}>
        {data.slice(0, 10).map((user: OwnerType) => (
          <Link href={user.html_url} key={user.id}>
            <Tooltip title={user.login} placement={"top-start"} arrow>
              <Avatar alt={user.login} src={user.avatar_url} />
            </Tooltip>
          </Link>
        ))}
      </AvatarGroup>
    </div>
  );
};

export default UserAvatarGroup;
