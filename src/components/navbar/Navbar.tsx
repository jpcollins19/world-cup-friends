import * as React from "react";
import { getMobileTestId, useIsMobile, tw, routes } from "../../store";
import Logo from "./Logo";
import { isMobileProps } from "../buffet";
import NavbarComp from "./comp/NavbarComp";

export const Navbar: React.FunctionComponent<isMobileProps> = ({
  ...props
}) => {
  const { isMobile } = props;

  const isMobileHook = useIsMobile();

  const isMobileResult = isMobile || isMobileHook;

  const mobileTestId = getMobileTestId(isMobileResult);

  const dataTestId = `navbar${mobileTestId}`;

  return (
    <div
      data-testid={dataTestId}
      className={`${tw.flexBoth} shadow-2xl flex-col h-full`}
    >
      <Logo isMobile={isMobileResult} />

      <NavbarComp />
    </div>
  );
};

export default Navbar;
