import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { getPageTestId, getTextFromUrl, tw } from "../../../store";

export type RouteProps = {
  path: string;
  icon: any;
};

type RouteCompProps = {
  route: RouteProps;
};

export const RouteComp: React.FunctionComponent<RouteCompProps> = ({
  ...props
}) => {
  const { route } = props;

  const { pathname } = useLocation();

  const routePath = route.path;

  const nakedRoute = routePath.split("/").pop();

  const testId = getPageTestId(`comp-route-${nakedRoute}`);

  const routeText = getTextFromUrl(routePath);

  const isCurrentPage = pathname === routePath;

  const currentPageClass = isCurrentPage
    ? "shadow-routesSelected bg-sky-600"
    : "shadow-routesNotSelected";

  return (
    <Link
      data-testid={testId}
      to={routePath}
      className={`${tw.flexA} ${tw.whiteTextSm} hover:${tw.elevate} hover:bg-sky-400 hover:shadow-routesHover w-full py-2 my-2 ${currentPageClass}`}
    >
      <div className={`${tw.flexA} w-full`}>
        <div className="ml-5">{route.icon}</div>
        <div
          data-testid="route-comp-text"
          className={`${tw.shrinkTextBase} w-full ml-6`}
        >
          {routeText}
        </div>
      </div>
    </Link>
  );
};

export default RouteComp;
