import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { isMobileProps } from "../buffet/isMobileProps";
import { getMobileTestId, routes, tw } from "../../store";

const worldCupImage =
  "https://1000logos.net/wp-content/uploads/2023/05/World-Cup-2026-Logo.png";

//  "https://rcrusadernews.com/wp-content/uploads/2022/06/World-Cup-900x720.png";

export const Logo: React.FunctionComponent<isMobileProps> = ({ ...props }) => {
  const { isMobile } = props;

  const mobileTestId = getMobileTestId(isMobile);

  const dataTestId = `logo${mobileTestId}`;
  const imageTestId = `logo-image${mobileTestId}`;

  return (
    <Router>
      <Link data-testid={dataTestId} to={routes.home} className="w-full h-1/5">
        <img
          data-testid={imageTestId}
          src={worldCupImage}
          className="w-full h-full"
          alt="World Cup Logo"
        ></img>
      </Link>
    </Router>
  );
};

export default Logo;
