import * as React from "react";
import { useFormikContext } from "formik";
import { createUrlFromText } from "../../store";
import { SignInSchema } from "../signIn/SignInSchema";

type TextFieldInputProps = {
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

  const inputTestId = `text-field-input-${createUrlFromText(label)}`;

  const { values } = useFormikContext<SignInSchema>();

  return (
    <div data-testid="text-field" className="w-8/12 relative">
      <input
        data-testid={inputTestId}
        required
        type={input?.type ?? "text"}
        name={label}
        value={values[label as keyof SignInSchema]}
        onChange={onChange}
        className="m-1 pt-3 w-full h-14 bg-gray-200 rounded-md border-2 border-black focus:outline-none text-center"
      />
      <span className="w-full absolute pointer-events-none top-2 text-gray-700 text-xs text-center">
        {label}
        <span data-testid="text-field-input-required" className="text-black">
          *
        </span>
      </span>
    </div>
  );
};

export default TextField;
