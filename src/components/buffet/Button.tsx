import * as React from "react";
import { createUrlFromText, getPageTestId, tw } from "../../store";
import { useIsMobile } from "../../hooks";

type ButtonProps = {
  form?: string;
  disabled?: boolean;
  text: string;
};

export const Button: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
  const { form, disabled, text } = props;

  const buttonBackground = !disabled ? "bg-zinc-300" : "bg-zinc-200";
  const buttonColor = !disabled ? "text-black" : "text-gray-500";
  const buttonHover = !disabled ? "hover:bg-zinc-400" : "";
  const buttonBorder = !disabled ? "border border-solid border-black" : "";

  const isMobile = useIsMobile();

  const buttonClass = isMobile
    ? "min-w-[15rem] py-4 text-2xl"
    : "min-w-[10rem] py-2";

  const dataTestId = getPageTestId(`button-cont-${createUrlFromText(text)}`);
  const buttonTestId = getPageTestId(`button-${createUrlFromText(text)}`);

  return (
    <div
      data-testid={dataTestId}
      className={`${tw.flexBoth} ${tw.elevate} my-5 rounded-lg ${buttonBackground}`}
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
