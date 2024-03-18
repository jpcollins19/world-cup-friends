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

  const dataTestId = getPageTestId("linkText-component");
  const linkTestId = getPageTestId(`linkText-link-${createUrlFromText(text)}`);

  const isMobile = useIsMobile();

  const linkClass = isMobile ? "text-2xl" : "";

  return (
    <div data-testid={dataTestId} className={`${tw.flexBoth} w-full`}>
      {/*{option.route === routes.signIn && (*/}
      {/*    <h4 className="create-account-sign-in">Already have an*/}
      {/*      account? </h4>*/}
      {/*)}*/}
      {/*<Router>*/}
      <Link
        data-testid={linkTestId}
        to={input.route}
        className={`${tw.textShadowSmWhite} font-bold text-blue-700 ${linkClass} `}
      >
        {text}
      </Link>
      {/*</Router>*/}
    </div>
  );
};

export default LinkText;
