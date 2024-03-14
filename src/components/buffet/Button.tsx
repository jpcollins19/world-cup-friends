import * as React from "react";
import { createUrlFromText, getPageTestId, tw } from "../../store";
import { useIsMobile } from "../../hooks";

type ButtonProps = {
  text: string;
  form?: string;
  disabled?: boolean;
  size?: string;
  onClick?: () => void;
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  size = "med",
  ...props
}) => {
  const { text, form, disabled, onClick } = props;

  const buttonBackground = !disabled ? "bg-zinc-300" : "bg-zinc-200";
  const buttonColor = !disabled ? "text-black" : "text-gray-500";
  const buttonHover = !disabled ? "hover:bg-zinc-400" : "";
  const buttonBorder = !disabled ? "border border-solid border-black" : "";

  const isMobile = useIsMobile();

  const smallButtonNeeded = size === "small";

  const buttonClass = isMobile
    ? "py-4 px-10 text-2xl"
    : smallButtonNeeded
      ? "px-3"
      : "py-2 px-10";

  const buttonCont = smallButtonNeeded ? "my-1" : "my-5";

  const dataTestId = getPageTestId(`button-cont-${createUrlFromText(text)}`);
  const buttonTestId = getPageTestId(`button-${createUrlFromText(text)}`);

  return (
    <div
      data-testid={dataTestId}
      className={`${tw.flexBoth} ${tw.elevate} rounded-lg w-fit ${buttonCont} ${buttonBackground}`}
    >
      <button
        data-testid={buttonTestId}
        form={form}
        type={form ? "submit" : undefined}
        disabled={disabled}
        onClick={onClick}
        className={`cursor-pointer rounded-lg font-bold ${buttonColor} ${buttonHover} ${buttonBorder} ${buttonClass}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
