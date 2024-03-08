import * as React from "react";
import { useFormikContext } from "formik";
import { createUrlFromText, getPageTestId, tw } from "../../store";
import { SignInSchema } from "../signIn/SignInSchema";
import { useIsMobile } from "../../hooks";

export type TextFieldInputProps = {
  label: string;
  type?: string;
  // extraProp: string;
};

type TextFieldProps = {
  input: TextFieldInputProps;
  onChange: (ev: any) => void | string;
};

export const TextField: React.FunctionComponent<TextFieldProps> = ({
  ...props
}) => {
  const { input, onChange } = props;

  const label = input.label;

  const isMobile = useIsMobile();

  const inputClass = isMobile ? "h-20 text-3xl" : "h-14";

  const spanClass = isMobile ? "text-xl" : "text-xs";

  const { values } = useFormikContext<SignInSchema>();

  const dataTestId = getPageTestId("text-field");

  const inputTestId = getPageTestId(
    `text-field-input-${createUrlFromText(label)}`,
  );

  const spanTestId = getPageTestId("input-text-span1");

  return (
    <div data-testid={dataTestId} className="w-8/12 relative">
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
        data-testid={spanTestId}
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
