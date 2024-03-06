import * as React from "react";
import { createUrlFromText, getMobileTestId, tw } from "../../store";

type ButtonProps = {
  form?: string;
  disabled?: boolean;
  text: string;
  isMobile?: boolean;
};

export const Button: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
  const { form, disabled, text, isMobile } = props;

  const mobileTestId = getMobileTestId(isMobile);

  const testId = `button-cont-${createUrlFromText(text)}${mobileTestId}`;
  const buttonTestId = `button-${createUrlFromText(text)}${mobileTestId}`;

  const buttonBackground = !disabled ? "bg-zinc-300" : "bg-zinc-200";
  const buttonColor = !disabled ? "text-black" : "text-gray-500";
  const buttonHover = !disabled ? "hover:bg-zinc-400" : "";
  const buttonBorder = !disabled ? "border border-solid border-black" : "";

  const buttonClass = isMobile
    ? "min-w-[15rem] py-4 text-2xl"
    : "min-w-[10rem] py-2";

  return (
    <div
      data-testid={testId}
      className={`${tw.flexBoth} ${tw.elevate} my-5 rounded-lg ${buttonBackground}`}
    >
      <button
        // form={form ? form : ""}
        data-testid={buttonTestId}
        form={form}
        type={form ? "submit" : undefined}
        disabled={disabled}
        // onClick={onClick}
        className={`px-3 cursor-pointer rounded-lg font-bold ${buttonColor} ${buttonHover} ${buttonBorder} ${buttonClass}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
