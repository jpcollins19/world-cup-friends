import * as React from "react";
import { Link } from "react-router-dom";
import { createUrlFromText, getPageTestId, tw } from "../../store";
import { useIsMobile } from "../../hooks";
import { LinkTextInputProps } from "./LinkText";

export const LinkButton: React.FunctionComponent<LinkTextInputProps> = ({
  route,
  text,
}) => {
  const buttonBackground = "bg-zinc-300";
  const buttonHover = "hover:bg-zinc-400";
  const buttonBorder = "border border-solid border-black";

  const isMobile = useIsMobile();

  const buttonClass = isMobile ? "py-4 px-10 text-2xl" : "py-2 px-5";

  const linkClass = isMobile ? "text-2xl" : "";

  const testId = getPageTestId(`link-button-cont-${createUrlFromText(text)}`);
  const buttonTestId = getPageTestId(`link-button-${createUrlFromText(text)}`);
  const linkTestId = getPageTestId(
    `link-button-link-${createUrlFromText(text)}`,
  );

  return (
    <div
      data-testid={testId}
      className={`${tw.flexBoth} ${tw.elevate} rounded-lg w-fit my-5 ${buttonBackground}`}
    >
      <button
        data-testid={buttonTestId}
        className={`cursor-pointer rounded-lg font-bold ${buttonHover} ${buttonBorder} ${buttonClass}`}
      >
        <Link
          data-testid={linkTestId}
          to={route}
          className={`font-bold text-black ${linkClass}`}
        >
          {text}
        </Link>
      </button>
    </div>
  );
};

export default LinkButton;
