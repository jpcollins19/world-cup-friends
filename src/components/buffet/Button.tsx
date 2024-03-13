import * as React from "react";
import { createUrlFromText, getPageTestId, tw } from "../../store";
import { useIsMobile } from "../../hooks";

type ButtonProps = {
  text: string;
  form?: string;
  disabled?: boolean;
  size?: string;
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  size = "med",
  ...props
}) => {
  const { text, form, disabled } = props;

  const buttonBackground = !disabled ? "bg-zinc-300" : "bg-zinc-200";
  const buttonColor = !disabled ? "text-black" : "text-gray-500";
  const buttonHover = !disabled ? "hover:bg-zinc-400" : "";
  const buttonBorder = !disabled ? "border border-solid border-black" : "";

  const isMobile = useIsMobile();

  const medButtonNeeded = size === "med";
  const smallButtonNeeded = size === "small";

  const buttonClass = isMobile
    ? "py-4 px-14 text-2xl"
    : medButtonNeeded
      ? "py-2 px-14"
      : smallButtonNeeded
        ? ""
        : "";

  const buttonCont = medButtonNeeded ? "my-5" : smallButtonNeeded ? "my-1" : "";

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
        className={`px-3 cursor-pointer rounded-lg font-bold ${buttonColor} ${buttonHover} ${buttonBorder} ${buttonClass}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
