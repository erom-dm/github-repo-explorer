import React from "react";
import { useLocation, NavLink } from "react-router-dom";

type QueryNavLinkProps = {
  to: string;
};

const QueryNavLink: React.FC<QueryNavLinkProps> = ({ to, ...props }) => {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
};

export default QueryNavLink;
