import * as React from "react";

type TextFieldInputProps = {
  label: string;
  type?: string;
  // extraProp: string;
};

type TextFieldProps = {
  input: TextFieldInputProps;
  onChange: (ev: any) => any;
};

export const Text_Field: React.FunctionComponent<TextFieldProps> = ({
  ...props
}) => {
  const { input, onChange } = props;
  return (
    <div data-testid="text-field" className="w-8/12 relative">
      <input
        data-testid="text-field-input"
        required
        type={input?.type ?? "text"}
        name={input.label}
        onChange={onChange}
        className="m-1 pt-3 w-full h-14 bg-gray-200 rounded-md border-2 border-black focus:outline-none text-center"
      />
      <span className="w-full absolute pointer-events-none top-2 text-gray-700 text-xs text-center">
        {input.label}
        <span data-testid="text-field-input-required" className="text-black">
          *
        </span>
      </span>
    </div>
  );
};

export default Text_Field;
