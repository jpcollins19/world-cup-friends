import * as React from "react";
import { useFormikContext } from "formik";
import { createUrlFromText, getMobileTestId, tw } from "../../store";
import { SignInSchema } from "../signIn/SignInSchema";

type TextFieldInputProps = {
  label: string;
  type?: string;
  // extraProp: string;
};

type TextFieldProps = {
  input: TextFieldInputProps;
  onChange: (ev: any) => void | string;
  isMobile?: boolean;
};

export const TextField: React.FunctionComponent<TextFieldProps> = ({
  ...props
}) => {
  const { input, onChange, isMobile } = props;

  const mobileTestId = getMobileTestId(isMobile);

  const label = input.label;

  const inputTestId = `text-field-input-${createUrlFromText(label)}${mobileTestId}`;

  const inputClass = isMobile ? "h-20 text-3xl" : "h-14";

  const spanClass = isMobile ? "text-xl" : "text-xs";

  const { values } = useFormikContext<SignInSchema>();

  return (
    <div data-testid={`text-field${mobileTestId}`} className="w-8/12 relative">
      <input
        data-testid={inputTestId}
        required
        type={input?.type ?? "text"}
        name={label}
        autoComplete="on"
        value={values[label as keyof SignInSchema]}
        onChange={onChange}
        className={`${inputClass} ${tw.elevate} m-1 pt-3 w-full bg-gray-200 rounded-md border-2 border-black focus:outline-none text-center`}
      />
      <span
        data-testid={`input-text-span1${mobileTestId}`}
        className={`${spanClass} w-full absolute pointer-events-none top-2 text-gray-700 text-center`}
      >
        {label}
        <span data-testid="text-field-input-required" className="text-black">
          *
        </span>
      </span>
    </div>
  );
};

export default TextField;
