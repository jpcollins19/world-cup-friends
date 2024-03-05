import * as React from "react";

import { getMobileTestId, useIsMobile, tw } from "../../store";
import Logo from "./Logo";
import { isMobileProps } from "../buffet/isMobileProps";

export const Navbar: React.FunctionComponent<isMobileProps> = ({
  ...props
}) => {
  const { isMobile } = props;

  const isMobileHook = useIsMobile();

  const isMobileResult = isMobile || isMobileHook;

  const mobileTestId = getMobileTestId(isMobileResult);

  const dataTestId = `navbar${mobileTestId}`;

  //const dataTestId = getPageTestId("loading");

  // const classN =
  //   "max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out";

  return (
    <div data-testid={dataTestId} className={`${tw.flexBoth} flex-col`}>
      <Logo isMobile={isMobileResult} />
      <div className={`${tw.elevate} w-full bg-red-200`}>routes</div>
    </div>
  );
};

export default Navbar;
