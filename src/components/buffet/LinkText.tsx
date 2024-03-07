import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { createUrlFromText, getMobileTestId, tw } from "../../store";

export type LinkTextInputProps = {
  route: string;
  text: string;
};

type LinkTextProps = {
  input: LinkTextInputProps;
  isMobile?: boolean;
};

export const LinkText: React.FunctionComponent<LinkTextProps> = ({
  ...props
}) => {
  const { input, isMobile } = props;

  const mobileTestId = getMobileTestId(isMobile);

  const text = input.text;

  const testId = `linkText-component${mobileTestId}`;
  const linkTestId = `linkText-link-${createUrlFromText(text)}${mobileTestId}`;

  const linkClass = isMobile ? "text-2xl" : "";

  return (
    <div data-testid={testId} className={`${tw.flexBoth} mt-4 w-full`}>
      {/*{option.route === routes.signIn && (*/}
      {/*    <h4 className="create-account-sign-in">Already have an*/}
      {/*      account? </h4>*/}
      {/*)}*/}
      <Router>
        <Link
          data-testid={linkTestId}
          to={input.route}
          className={`${tw.textShadowSmWhite} font-bold text-blue-700 ${linkClass} `}
        >
          {text}
        </Link>
      </Router>
    </div>
  );
};

export default LinkText;
