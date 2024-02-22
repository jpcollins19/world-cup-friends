import * as React from "react";

type TextFieldInputProps = {
  label: string;
  type?: string;
  extraProp: string;
};

type TextFieldProps = {
  input: TextFieldInputProps;
};

export const Text_Field: React.FunctionComponent<TextFieldProps> = ({
  input,
}) => {
  return (
    <div className="w-8/12 relative">
      <input
        required
        type={input?.type ?? "text"}
        className="m-1 pt-3 w-full h-14 bg-gray-200 rounded-md border-2 border-black focus:outline-none text-center"
      />
      <span className="w-full absolute pointer-events-none top-2 text-gray-700 text-xs text-center">
        {input.label}
        <span className="text-black"> *</span>
      </span>
    </div>
  );
};

export default Text_Field;
