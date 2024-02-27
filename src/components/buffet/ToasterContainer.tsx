import * as React from "react";
import { Toaster } from "react-hot-toast";

type ToasterContainerProps = {
  className: string;
};

export const ToasterContainer: React.FunctionComponent<
  ToasterContainerProps
> = ({ className }) => {
  return <Toaster toastOptions={{ className }} />;
};

export default ToasterContainer;
