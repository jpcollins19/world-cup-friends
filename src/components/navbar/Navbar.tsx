import * as React from "react";
import { getPageTestId, tw } from "../../store";
import Logo from "./Logo";
import NavbarComp from "./comp/NavbarComp";
import { useIsMobile } from "../../hooks";

export const Navbar: React.FunctionComponent = () => {
  const testId = getPageTestId("navbar");

  return (
    <div
      data-testid={testId}
      className={`${tw.flexBoth} shadow-2xl flex-col h-full`}
    >
      <Logo />

      <NavbarComp />
    </div>
  );
};

export default Navbar;
