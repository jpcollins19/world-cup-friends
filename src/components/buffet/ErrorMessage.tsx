import * as React from "react";
import Error from "@mui/icons-material/ErrorOutline";
import { tw } from "../../store";

type ErrorMessageProps = {
  text: string;
};

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({
  text,
}) => {
  return (
    <div data-testid="error-message" className={`${tw.flexBoth} my-4`}>
      <Error
        // fontSize={`${isMobileView ? "large" : "medium"}`}
        fontSize="medium"
      />
      <div className="ml-2">{text}</div>
    </div>
  );
};

export default ErrorMessage;
