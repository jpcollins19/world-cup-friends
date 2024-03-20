import * as React from "react";
import RingLoader from "react-spinners/RingLoader";
import { useIsMobile } from "../../hooks";
import { getPageTestId, tw } from "../../store";

export const Loading: React.FunctionComponent = () => {
  const isMobile = useIsMobile();

  const mobileSize = isMobile ? 200 : 100;

  const testId = getPageTestId("loading");

  return (
    <div
      data-testid={testId}
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
