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
  elevateClass,
} from "../testingUtils";
import { TextField } from "../buffet";

jest.mock("react-responsive");

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
    const inputTestId = await getTestIdTag("text-field-input-email");

    expect(pageTestId).toBeInTheDocument();
    expect(inputTestId).toBeInTheDocument();
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

  describe("mobile vs. comp testing", () => {
    it("renders the mobile page", async () => {
      render(
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <TextField
            input={{ label: pw, type: pw }}
            onChange={onChange()}
            isMobile={true}
          />
        </Formik>,
      );

      const pageTestId = await getTestIdTag("text-field-mobile");
      const inputTestId = await getTestIdTag(
        "text-field-input-password-mobile",
      );

      expect(pageTestId).toBeInTheDocument();
      expect(inputTestId).toBeInTheDocument();
    });

    describe("classTesting", () => {
      const inputClass = "text-field-input-password";
      const spanClass = "input-text-span1";

      const inputClassBaseInfo = `${elevateClass} m-1 pt-3 w-full bg-gray-200 rounded-md border-2 border-black focus:outline-none text-center`;

      const spanClassBaseInfo =
        "w-full absolute pointer-events-none top-2 text-gray-700 text-center";

      const testsToRun = {
        comp: [
          { testId: inputClass, result: `${inputClassBaseInfo} h-14` },
          {
            testId: spanClass,
            result: `${spanClassBaseInfo} text-xs`,
          },
        ],
        mobile: [
          {
            testId: `${inputClass}-mobile`,
            result: `${inputClassBaseInfo} h-20 text-3xl`,
          },
          {
            testId: `${spanClass}-mobile`,
            result: `${spanClassBaseInfo} text-xl`,
          },
        ],
      };

      describe("comp view", () => {
        testsToRun.comp.forEach((test) => {
          it(`${test.testId}`, async () => {
            render(
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <TextField
                  input={{ label: pw, type: pw }}
                  onChange={onChange()}
                />
              </Formik>,
            );

            const testId = await getTestIdTag(test.testId);
            expect(testId).toHaveClass(test.result);
          });
        });
      });

      describe("mobile view", () => {
        testsToRun.mobile.forEach((test) => {
          it(`${test.testId}`, async () => {
            render(
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <TextField
                  input={{ label: pw, type: pw }}
                  onChange={onChange()}
                  isMobile={true}
                />
              </Formik>,
            );

            const testId = await getTestIdTag(test.testId);
            expect(testId).toHaveClass(test.result);
          });
        });
      });
    });
  });
});
