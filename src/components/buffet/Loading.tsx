import * as React from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { tw } from "../../store";

export const Loading: React.FunctionComponent = () => {
  return (
    <div
      className={`${tw.flexBoth} w-screen h-screen overflow-auto flex flex-col bg-gradient-to-br from-gray-600 via-gray-800 to-gray-600`}
    >
      <SpinnerCircularFixed
        size={100}
        thickness={100}
        speed={147}
        color="white"
        secondaryColor="black"
      />
    </div>
  );
};

export default Loading;
