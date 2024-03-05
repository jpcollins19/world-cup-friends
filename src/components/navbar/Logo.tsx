import * as React from "react";
import { isMobileProps } from "../buffet/isMobileProps";
import { getMobileTestId } from "../../store";

const worldCupImage =
  "https://1000logos.net/wp-content/uploads/2023/05/World-Cup-2026-Logo.png";

//  "https://rcrusadernews.com/wp-content/uploads/2022/06/World-Cup-900x720.png";

export const Logo: React.FunctionComponent<isMobileProps> = ({ ...props }) => {
  const { isMobile } = props;

  const mobileTestId = getMobileTestId(isMobile);

  const dataTestId = `logo${mobileTestId}`;

  return (
    <img
      data-testid={dataTestId}
      src={worldCupImage}
      className="w-full h-auto py-5"
      alt="World Cup Logo"
    ></img>
  );
};

export default Logo;
