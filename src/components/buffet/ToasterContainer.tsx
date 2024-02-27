import * as React from "react";
import { Toaster } from "react-hot-toast";

type ToasterContainerProps = {
  className: string;
};

export const ToasterContainer: React.FunctionComponent<
  ToasterContainerProps
> = ({ className }) => {
  return (
    <div data-testid="toaster-cont">
      <Toaster toastOptions={{ className }} />
    </div>
  );
};

export default ToasterContainer;
