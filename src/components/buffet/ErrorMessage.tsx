import * as React from "react";
import Error from "@mui/icons-material/ErrorOutline";
import { getMobileTestId, tw } from "../../store";

type ErrorMessageProps = {
  text: string;
  isMobile?: boolean;
};

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({
  ...props
}) => {
  const { text, isMobile } = props;

  const mobileTestId = getMobileTestId(isMobile);

  const fontSize = isMobile ? 50 : 20;

  const textSizeClass = isMobile ? "text-2xl" : "";

  const testId = `error-message${mobileTestId}`;
  const textTestId = `error-message-text${mobileTestId}`;

  return (
    <div data-testid={testId} className={`${tw.flexBoth} my-4`}>
      <Error style={{ fontSize }} />
      <div data-testid={textTestId} className={`${textSizeClass} ml-2`}>
        {text}
      </div>
    </div>
  );
};

export default ErrorMessage;
