import * as React from "react";
import { tw } from "../../../store";

export const NavbarComp: React.FunctionComponent = () => {
  return (
    <div
      data-testid="navbar-comp"
      className={`${tw.elevate} w-full h-4/5 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700`}
    >
      routes
    </div>
  );
};

export default NavbarComp;
