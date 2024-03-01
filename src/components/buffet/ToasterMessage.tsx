import * as React from "react";
import toast from "react-hot-toast";

type ToasterMessageProps = {
  component: any;
};

export const ToasterMessage: React.FunctionComponent<ToasterMessageProps> = ({
  component,
}) => {
  // return toast(component, { duration: 5000 });
  return toast(component, { duration: 500000 });
};

export default ToasterMessage;
