import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Formik } from "formik";
import {
  changeInputText,
  getTestIdTag,
  emailInputTestId,
  pwInputTestId,
  email,
  pw,
} from "../testingUtils";
import { TextField } from "../buffet";

describe("<TextField/>", () => {
  const onSubmit = jest.fn();
  const onChange = () => jest.fn();

  const initialValues = {
    email: "email",
  };

  it("should render the component", async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <TextField input={{ label: email }} onChange={onChange()} />
      </Formik>,
    );

    const pageTestId = await getTestIdTag("text-field");

    expect(pageTestId).toBeInTheDocument();
  });

  it("the default type is 'text'", async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <TextField input={{ label: email }} onChange={onChange()} />
      </Formik>,
    );

    const input = await getTestIdTag(emailInputTestId);

    expect(input).toHaveAttribute("type", "text");
  });

  it("the default is required", async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <TextField input={{ label: email }} onChange={onChange()} />
      </Formik>,
    );

    const input = await getTestIdTag(emailInputTestId);
    const requiredSymbol = await getTestIdTag("text-field-input-required");

    expect(input).toHaveAttribute("required");
    expect(requiredSymbol).toBeInTheDocument();
  });

  it("input type is password when passed in", async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <TextField input={{ label: pw, type: pw }} onChange={onChange()} />
      </Formik>,
    );

    const input = await getTestIdTag(pwInputTestId);

    expect(input).toHaveAttribute("type", pw);
  });

  it("onChange changes the input value", async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <TextField input={{ label: pw, type: pw }} onChange={onChange()} />
      </Formik>,
    );

    const input = await getTestIdTag(pwInputTestId);

    await changeInputText(input, email);

    expect(input).toHaveValue(email);
  });
});
