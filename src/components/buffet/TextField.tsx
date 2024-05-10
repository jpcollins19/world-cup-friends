import * as React from "react";
import { useFormikContext } from "formik";
import {
  cap1stLetter,
  createUrlFromText,
  getPageTestId,
  tw,
} from "../../store";
import { useIsMobile } from "../../hooks";
import { LastUpdatedSchema } from "../navbar/lastUpdated/LastUpdatedAdmin";

export type TextFieldInputProps = {
  label: string;
  type?: string;
};

type TextFieldProps = {
  label: string; //requiring label so the input testId is created/tracked
  type?: string | null;
  onChange?: (ev: any) => void | string;
  showHelperText?: boolean;
  isRequired?: boolean;
  height?: string;
  width?: string;
  showValue?: boolean;
  schema?: string;
};

interface InputAttributes extends React.InputHTMLAttributes<HTMLInputElement> {
  "data-testid": string;
  value?: string;
}

export const TextField: React.FunctionComponent<TextFieldProps> = ({
  showHelperText = true,
  isRequired = true,
  height = "med",
  width = "med",
  showValue = false,
  ...props
}) => {
  const { label, type, onChange, schema } = props;

  const isMobile = useIsMobile();

  const largeTextFieldNeeded = width === "large";

  const textFieldContClass = largeTextFieldNeeded ? "w-11/12" : "w-7/12";

  const shortTextFieldNeeded = height === "short";

  const inputClass = isMobile
    ? "h-20 text-3xl"
    : shortTextFieldNeeded
      ? "h-9"
      : "h-14";

  const spanClass = isMobile ? "text-xl" : "text-xs";

  const testId = getPageTestId("text-field");

  const inputTestId = getPageTestId(
    `text-field-input-${createUrlFromText(label)}`,
  );

  const spanTestId = getPageTestId(
    `input-text-span1-${createUrlFromText(label)}`,
  );

  const spanRequiredSymbolTestId = getPageTestId(
    `text-field-input-required-${createUrlFromText(label)}`,
  );

  const SpanRequiredSymbol: React.FunctionComponent = () => {
    return (
      <span data-testid={spanRequiredSymbolTestId} className="text-black">
        *
      </span>
    );
  };

  const SpanLabel: React.FunctionComponent = () => {
    return (
      <span
        data-testid={spanTestId}
        className={`${spanClass} w-full absolute pointer-events-none top-2 text-gray-700 text-center`}
      >
        {cap1stLetter(label)}

        {isRequired && <SpanRequiredSymbol />}
      </span>
    );
  };

  const inputAttributes: InputAttributes = {
    "data-testid": inputTestId,
    type: type ?? "text",
    name: label,
    autoComplete: "on",
    onChange,
    className: `${tw.elevate} m-1 pt-3 w-full bg-gray-200 rounded-md border-2 border-black focus:outline-none text-center ${inputClass}`,
  };

  function useFormikContextWithType<T>(schemaType: T) {
    return useFormikContext<LastUpdatedSchema>();
  }

  function assignSchema(schemaType: string | undefined) {
    let assignedSchema;

    // if (schemaType === "lastUpdated") {
    //   assignedSchema = LastUpdatedSchema; // Replace with actual values
    // } else if (schemaType === "signIn") {
    //   // assignedSchema = { isLoading: false }; // Replace with actual values
    // } else {
    //   console.error("Unknown schema type");
    //   return; // Exit the function or handle the error as needed
    // }

    // Now you can use 'assignedSchema' as your schema
    //const { values } = useFormikContextWithType(assignedSchema);

    const { values } = useFormikContext<LastUpdatedSchema>();
    // console.log(values);

    return values;
  }

  if (showValue) {
    const values = assignSchema(schema);

    //const { values } = useFormikContext<LastUpdatedSchema>();

    inputAttributes.value = values[label];
    //as keyof LastUpdatedSchema];
  }

  // type AllSchemas = SignInSchema | LastUpdatedSchema;

  // let values;
  //
  // if (schema) {
  //   values = assignSchema(schema);
  // }

  // console.log("values", values);

  //const label = input.label;

  //const { values } = useFormikContextWithType(assignedSchema);

  //const { values } = useFormikContext<AllSchemas>();

  return (
    <div data-testid={testId} className={`relative ${textFieldContClass}`}>
      <input {...inputAttributes} />

      {/*<input*/}
      {/*  data-testid={inputTestId}*/}
      {/*  type={type ?? "text"}*/}
      {/*  name={label}*/}
      {/*  autoComplete="on"*/}
      {/*  // value={values[label]}*/}
      {/*  onChange={onChange}*/}
      {/*  className={`${tw.elevate} m-1 pt-3 w-full bg-gray-200 rounded-md border-2 border-black focus:outline-none text-center ${inputClass}`}*/}
      {/*/>*/}

      {showHelperText && <SpanLabel />}
    </div>
  );
};

export default TextField;
