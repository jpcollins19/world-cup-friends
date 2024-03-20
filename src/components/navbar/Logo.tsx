import * as React from "react";
import { Link } from "react-router-dom";
import { getPageTestId, routes } from "../../store";

const worldCupImage =
  "https://1000logos.net/wp-content/uploads/2023/05/World-Cup-2026-Logo.png";

//  "https://rcrusadernews.com/wp-content/uploads/2022/06/World-Cup-900x720.png";

export const Logo: React.FunctionComponent = () => {
  const testId = getPageTestId("logo");
  const imageTestId = getPageTestId("logo-image");

  return (
    <Link data-testid={testId} to={routes.home} className="w-full h-1/5">
      <img
        data-testid={imageTestId}
        src={worldCupImage}
        className="w-full h-full"
        alt="World Cup Logo"
      ></img>
    </Link>
  );
};

export default Logo;
