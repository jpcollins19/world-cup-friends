import * as React from "react";
import { useFormikContext } from "formik";
import {
  cap1stLetter,
  createUrlFromText,
  getPageTestId,
  tw,
} from "../../store";
import { SignInSchema } from "../signIn/SignInSchema";
import { useIsMobile } from "../../hooks";
import { LastUpdatedSchema } from "../navbar/lastUpdated/LastUpdatedEdit";

export type TextFieldInputProps = {
  label: string;
  type?: string;
};

type TextFieldProps = {
  label: string; //requiring label so the input testId is created/tracked
  type?: string | null;
  onChange?: (ev: any) => void | string;
  schema?: string;
  showSpan?: boolean;
  isRequired?: boolean;
};

export const TextField: React.FunctionComponent<TextFieldProps> = ({
  isRequired = true,
  showSpan = true,
  ...props
}) => {
  const { label, type, onChange, schema } = props;

  function useFormikContextWithType<T>(schemaType: T) {
    return useFormikContext<T>();
  }

  type AllSchemas = SignInSchema | LastUpdatedSchema;

  function assignSchema(schemaType: string) {
    let assignedSchema;

    if (schemaType === "signIn") {
      assignedSchema = { email: "", password: "" }; // Replace with actual values
    } else if (schemaType === "loading") {
      // assignedSchema = { isLoading: false }; // Replace with actual values
    } else {
      console.error("Unknown schema type");
      return; // Exit the function or handle the error as needed
    }

    // Now you can use 'assignedSchema' as your schema
    const { values } = useFormikContextWithType(assignedSchema);
    // console.log(values);

    return values;
  }

  // let values;
  //
  // if (schema) {
  //   values = assignSchema(schema);
  // }

  // console.log("values", values);

  //const label = input.label;

  const isMobile = useIsMobile();

  const inputClass = isMobile ? "h-20 text-3xl" : "h-14";

  const spanClass = isMobile ? "text-xl" : "text-xs";

  //const { values } = useFormikContextWithType(assignedSchema);

  //const { values } = useFormikContext<AllSchemas>();

  const dataTestId = getPageTestId("text-field");

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

  return (
    <div data-testid={dataTestId} className="w-8/12 relative">
      <input
        data-testid={inputTestId}
        type={type ?? "text"}
        name={label}
        autoComplete="on"
        // value={values[label]}
        onChange={onChange}
        className={`${inputClass} ${tw.elevate} m-1 pt-3 w-full bg-gray-200 rounded-md border-2 border-black focus:outline-none text-center`}
      />

      {showSpan && <SpanLabel />}
    </div>
  );
};

export default TextField;
