import * as React from "react";
import { Link } from "react-router-dom";
import {
  geti18n,
  getPageTestId,
  loadingDefault,
  routes,
  tw,
} from "../../store";
import { Loading } from "../buffet";

export const PreSignIn: React.FunctionComponent = () => {
  const messi = "/public/pics/messiTrophy.jpg";

  const testId = getPageTestId("home-page");
  const linkTestId = getPageTestId("home-page-link");

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div
      data-testid={testId}
      className={tw.backgroundImage}
      style={{ backgroundImage: `url(${messi})` }}
    >
      <Link
        data-testid={linkTestId}
        to={routes.signIn}
        className={`${tw.whiteTextMed} flex justify-end pr-10 pt-10 text-4xl`}
      >
        {geti18n("signIn")}
      </Link>
    </div>
  );
};

export default PreSignIn;
