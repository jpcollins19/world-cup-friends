import * as React from "react";
import Error from "@mui/icons-material/ErrorOutline";
import { getPageTestId, tw } from "../../store";
import { useIsMobile } from "../../hooks";

type ErrorMessageProps = {
  text: string;
};

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({
  text,
}) => {
  const isMobile = useIsMobile();

  const fontSize = isMobile ? 50 : 20;

  const textSizeClass = isMobile ? "text-2xl" : "";

  const dataTestId = getPageTestId("error-message");
  const textTestId = getPageTestId("error-message-text");

  return (
    <div data-testid={dataTestId} className={`${tw.flexBoth} my-4`}>
      <Error style={{ fontSize }} />
      <div data-testid={textTestId} className={`${textSizeClass} ml-2`}>
        {text}
      </div>
    </div>
  );
};

export default ErrorMessage;
