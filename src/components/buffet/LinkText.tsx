import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { createUrlFromText, getPageTestId, tw } from "../../store";
import { useIsMobile } from "../../hooks";

export type LinkTextInputProps = {
  route: string;
  text: string;
};

type LinkTextProps = {
  input: LinkTextInputProps;
};

export const LinkText: React.FunctionComponent<LinkTextProps> = ({ input }) => {
  const text = input.text;

  const testId = getPageTestId("linkText-component");
  const linkTestId = getPageTestId(`linkText-link-${createUrlFromText(text)}`);

  const isMobile = useIsMobile();

  const linkClass = isMobile ? "text-2xl" : "";

  return (
    <div data-testid={testId} className={`${tw.flexBoth} w-full`}>
      <Link
        data-testid={linkTestId}
        to={input.route}
        className={`${tw.textShadowSmWhite} font-bold text-blue-700 ${linkClass} `}
      >
        {text}
      </Link>
    </div>
  );
};

export default LinkText;
