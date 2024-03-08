import * as React from "react";
import { getPageTestId, tw } from "../../store";
import Logo from "./Logo";
import NavbarComp from "./comp/NavbarComp";

export const Navbar: React.FunctionComponent = () => {
  const dataTestId = getPageTestId("navbar");

  return (
    <div
      data-testid={dataTestId}
      className={`${tw.flexBoth} shadow-2xl flex-col h-full`}
    >
      <Logo />

      <NavbarComp />
    </div>
  );
};

export default Navbar;
