import * as React from "react";
import { Link } from "react-router-dom";
import { getPageTestId, loadingDefault, routes, tw } from "../../store";
import { Loading } from "../buffet";

export const NoMatch: React.FunctionComponent = () => {
  const monkey = "/public/pics/monkey404.jpg";

  const testId = getPageTestId("no-match-page");
  const linkTestId = getPageTestId("no-match-link");

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div
      data-testid={testId}
      className={tw.backgroundImage}
      style={{ backgroundImage: `url(${monkey})` }}
    >
      <div
        className={`${tw.whiteTextMed} ${tw.flexBoth} flex-col pt-72 ml-40 w-1/4`}
      >
        <h1 className="text-4xl">404 Error</h1>
        <Link data-testid={linkTestId} to={routes.leaderboard}>
          <h2>Click here for the Home Page</h2>
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;
