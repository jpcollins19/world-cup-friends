import * as React from "react";
import "@testing-library/jest-dom";
import {
  changeInputText,
  getTestIdTag,
  emailInputTestId,
  pwInputTestId,
  email,
  pw,
  elevateClass,
  mockWindowMobileView,
  renderFormik,
  queryTestIdTag,
} from "../testingUtils";
import { TextField } from "../buffet";

//TextField - make labelSpan optional and default to true

describe("<TextField/>", () => {
  const onSubmit = jest.fn();
  const onChange = () => jest.fn();

  const initialValues = {
    email: "email",
  };

  const spanLabelTestId = "input-text-span1-email";
  const spanRequiredSymbolTestId = "text-field-input-required-email";

  it("should render the component", async () => {
    const component = <TextField label={email} onChange={onChange()} />;

    renderFormik(component, initialValues, onSubmit);

    const pageTestId = await getTestIdTag("text-field");
    const inputTestId = await getTestIdTag("text-field-input-email");

    expect(pageTestId).toBeInTheDocument();
    expect(inputTestId).toBeInTheDocument();
  });

  it("the default type is 'text'", async () => {
    const component = <TextField label={email} onChange={onChange()} />;

    renderFormik(component, initialValues, onSubmit);

    const input = await getTestIdTag(emailInputTestId);
    expect(input).toHaveAttribute("type", "text");
  });

  it("input type is password when passed in", async () => {
    const component = <TextField label={pw} type={pw} onChange={onChange()} />;

    renderFormik(component, initialValues, onSubmit);

    const input = await getTestIdTag(pwInputTestId);
    expect(input).toHaveAttribute("type", pw);
  });

  it("onChange changes the input value", async () => {
    const component = <TextField label={pw} type={pw} onChange={onChange()} />;

    renderFormik(component, initialValues, onSubmit);

    const input = await getTestIdTag(pwInputTestId);

    await changeInputText(input, email);

    expect(input).toHaveValue(email);
  });

  describe("showSpan", () => {
    describe("when showSpan is true", () => {
      it("defaults to true and renders the span label", async () => {
        const component = <TextField label={email} onChange={onChange()} />;

        renderFormik(component, initialValues, onSubmit);

        const span = await getTestIdTag(spanLabelTestId);

        expect(span).toBeInTheDocument();
        expect(span).toHaveTextContent("Email");
      });

      it("isRequired defaults to true and showSpanRequiredSymbol renders", async () => {
        const component = <TextField label={email} onChange={onChange()} />;

        renderFormik(component, initialValues, onSubmit);

        const spanRequiredSymbol = await getTestIdTag(spanRequiredSymbolTestId);

        expect(spanRequiredSymbol).toBeInTheDocument();
        expect(spanRequiredSymbol).toHaveTextContent("*");
      });

      it("when isRequired is false, showSpanRequiredSymbol does not render", async () => {
        const component = (
          <TextField label={email} onChange={onChange()} isRequired={false} />
        );

        renderFormik(component, initialValues, onSubmit);

        const spanRequiredSymbol = await queryTestIdTag(
          spanRequiredSymbolTestId,
        );

        expect(spanRequiredSymbol).not.toBeInTheDocument();
      });
    });

    describe("when showSpan is false", () => {
      it("span label does not render", async () => {
        const component = (
          <TextField label={email} onChange={onChange()} showSpan={false} />
        );

        renderFormik(component, initialValues, onSubmit);

        const span = await queryTestIdTag(spanLabelTestId);

        expect(span).not.toBeInTheDocument();
      });

      it("showSpanRequiredSymbol does not render", async () => {
        const component = (
          <TextField label={email} onChange={onChange()} showSpan={false} />
        );

        renderFormik(component, initialValues, onSubmit);

        const spanRequiredSymbol = await queryTestIdTag(
          spanRequiredSymbolTestId,
        );

        expect(spanRequiredSymbol).not.toBeInTheDocument();
      });
    });
  });

  describe("classTesting", () => {
    const inputClass = "text-field-input-password";

    const spanClass = "input-text-span1-password";

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

    describe("comp", () => {
      testsToRun.comp.forEach((test) => {
        it(`${test.testId}`, async () => {
          const component = (
            <TextField label={pw} type={pw} onChange={onChange()} />
          );

          renderFormik(component, initialValues, onSubmit);

          const testId = await getTestIdTag(test.testId);

          expect(testId).toHaveClass(test.result);
        });
      });
    });

    describe("mobile", () => {
      testsToRun.mobile.forEach((test) => {
        it(`${test.testId}`, async () => {
          mockWindowMobileView(true);

          const component = (
            <TextField label={pw} type={pw} onChange={onChange()} />
          );

          renderFormik(component, initialValues, onSubmit);

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockWindowMobileView(true);

      const component = (
        <TextField label={pw} type={pw} onChange={onChange()} />
      );

      renderFormik(component, initialValues, onSubmit);

      const pageTestId = await getTestIdTag("text-field-mobile");

      const inputTestId = await getTestIdTag(
        "text-field-input-password-mobile",
      );

      expect(pageTestId).toBeInTheDocument();

      expect(inputTestId).toBeInTheDocument();
    });
  });
});
