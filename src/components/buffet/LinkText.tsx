import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { colors, tw } from "../../store";

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
          data-testid="linkText-link"
          to={input.route}
          className={`font-bold text-${colors.linkBlue}`}
        >
          {input.text}
        </Link>
      </Router>
    </div>
  );
};

export default LinkText;
