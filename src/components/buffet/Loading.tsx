import * as React from "react";
import RingLoader from "react-spinners/RingLoader";
import { getMobileTestId, getPageTestId, tw, useIsMobile } from "../../store";
import { isMobileProps } from "./";

// export const Loading: React.FunctionComponent = ({ ...props }) => {
export const Loading: React.FunctionComponent<isMobileProps> = ({
  ...props
}) => {
  const { isMobile } = props;

  const isMobileHook = useIsMobile();

  const isMobileResult = isMobile || isMobileHook;

  const mobileTestId = getMobileTestId(isMobileResult);

  const dataTestId = `loading${mobileTestId}`;

  //const dataTestId = getPageTestId("loading");

  const mobileSize = isMobile ? 200 : 100;

  return (
    <div
      data-testid={dataTestId}
      className={`${tw.flexBoth} h-screen overflow-auto flex flex-col bg-gradient-to-bl from-gray-500 via-gray-600 to-gray-500`}
    >
      <RingLoader
        color="white"
        size={mobileSize}
        // thickness={100}
        // speed={147}
        // color="white"
        // secondaryColor="black"
      />
    </div>
  );
};

export default Loading;
