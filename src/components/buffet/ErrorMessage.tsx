import * as React from "react";
import Error from "@mui/icons-material/ErrorOutline";
import { getPageTestId, tw } from "../../store";
import { useIsMobile } from "../../hooks";

type ErrorMessageProps = {
  text: string;
  showErrorBackground?: boolean;
};

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({
  text,
  showErrorBackground = false,
}) => {
  const isMobile = useIsMobile();

  const fontSize = isMobile ? 50 : 20;

  const textSizeClass = isMobile ? "text-2xl" : "";

  const testId = getPageTestId("error-message");
  const textTestId = getPageTestId("error-message-text");

  const errorBackgroundClass = showErrorBackground
    ? `${tw.errorMessageBackground} p-4 rounded`
    : "";

  return (
    <div
      data-testid={testId}
      className={`${tw.flexBoth} ${errorBackgroundClass} my-4`}
    >
      <Error style={{ fontSize }} />
      <div data-testid={textTestId} className={`${textSizeClass} ml-2`}>
        {text}
      </div>
    </div>
  );
};

export default ErrorMessage;
