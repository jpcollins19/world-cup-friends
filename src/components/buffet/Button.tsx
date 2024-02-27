import * as React from "react";
import { createUrlFromText, tw } from "../../store";

type ButtonProps = {
  form?: string;
  disabled?: boolean;
  text: string;
};

export const Button: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
  const { form, disabled, text } = props;

  const testId = `button-${createUrlFromText(text)}`;

  const buttonBackground = disabled ? "bg-zinc-200" : "bg-zinc-300";
  const buttonColor = disabled ? "text-gray-500" : "text-black";
  const buttonHover = !disabled ? "hover:bg-zinc-400" : "";

  return (
    <div
      data-testid={testId}
      className={`${tw.flexBoth} ${buttonBackground} my-5 rounded-lg`}
    >
      <button
        // form={form ? form : ""}
        form={form}
        type={form ? "submit" : undefined}
        disabled={disabled}
        // onClick={onClick}
        className={`px-3 py-2 min-w-[10rem] cursor-pointer rounded-lg font-bold ${buttonHover} ${buttonColor}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
