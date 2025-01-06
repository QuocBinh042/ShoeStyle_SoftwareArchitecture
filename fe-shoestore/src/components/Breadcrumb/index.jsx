import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation, matchRoutes } from "react-router-dom";
import { routes } from "../../router/router";

function CustomBreadcrumb() {
  const location = useLocation();
  const matchedRoutes = matchRoutes(routes, location.pathname) || [];
  if (location.pathname === "/") {
    return null;
  }
  const itemRender = (route, index) => {
    const isLast = index === matchedRoutes.length - 1;

    const path = matchedRoutes
      .slice(0, index + 1)
      .map((r) => r.route.path)
      .join("/")
      .replace(/\/+/g, "/");
    return isLast ? (
      <span>{route.route.breadcrumb}</span>
    ) : (
      <Link to={path}>{route.route.breadcrumb}</Link>
    );
  };

  return (
    <Breadcrumb>
      {matchedRoutes.map((route, index) => (
        <Breadcrumb.Item key={index} >
          {itemRender(route, index)}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default CustomBreadcrumb;
