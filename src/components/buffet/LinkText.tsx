import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { colors, createUrlFromText, tw } from "../../store";

type LinkTextInputProps = {
  route: string;
  text: string;
};

type LinkTextProps = {
  input: LinkTextInputProps;
};

export const LinkText: React.FunctionComponent<LinkTextProps> = ({
  ...props
}) => {
  const { input } = props;

  const text = input.text;

  const linkTestId = `linkText-link-${createUrlFromText(text)}`;

  return (
    <div
      data-testid="linkText-component"
      className={`${tw.flexBoth} mt-4 w-full`}
    >
      {/*{option.route === routes.signIn && (*/}
      {/*    <h4 className="create-account-sign-in">Already have an*/}
      {/*      account? </h4>*/}
      {/*)}*/}

      <Router>
        <Link
          data-testid={linkTestId}
          to={input.route}
          className="font-bold text-blue-700"
        >
          {text}
        </Link>
      </Router>
    </div>
  );
};

export default LinkText;
