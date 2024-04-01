import * as React from "react";
import "@testing-library/jest-dom";
import {
  changeInputText,
  getTestIdTag,
  email,
  pw,
  elevateClass,
  mockWindowMobileView,
  renderWithFormik,
  queryTestIdTag,
  getTextFieldTag,
} from "../../testingUtils";
import { TextField } from "../../buffet";

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

    renderWithFormik(component, initialValues, onSubmit);

    const pageTestId = await getTestIdTag("text-field");
    const inputTestId = await getTextFieldTag("email");

    expect(pageTestId).toBeTruthy();
    expect(inputTestId).toBeTruthy();
  });

  it("the default type is 'text'", async () => {
    const component = <TextField label={email} onChange={onChange()} />;

    renderWithFormik(component, initialValues, onSubmit);

    const input = await getTextFieldTag("email");
    expect(input).toHaveAttribute("type", "text");
  });

  it("input type is password when passed in", async () => {
    const component = <TextField label={pw} type={pw} onChange={onChange()} />;

    renderWithFormik(component, initialValues, onSubmit);

    const input = await getTextFieldTag("password");

    expect(input).toHaveAttribute("type", pw);
  });

  it("onChange changes the input value", async () => {
    const component = <TextField label={pw} type={pw} onChange={onChange()} />;

    renderWithFormik(component, initialValues, onSubmit);

    const input = await getTextFieldTag("password");

    await changeInputText(input, email);

    expect(input).toHaveValue(email);
  });

  describe("showHelperText & isRequired", () => {
    describe("when showHelperText is true", () => {
      it("defaults to true and renders the span label", async () => {
        const component = <TextField label={email} onChange={onChange()} />;

        renderWithFormik(component, initialValues, onSubmit);

        const span = await getTestIdTag(spanLabelTestId);

        expect(span).toBeTruthy();
        expect(span).toHaveTextContent("Email");
      });

      it("isRequired defaults to true and requiredSymbol renders", async () => {
        const component = <TextField label={email} onChange={onChange()} />;

        renderWithFormik(component, initialValues, onSubmit);

        const spanRequiredSymbol = await getTestIdTag(spanRequiredSymbolTestId);

        expect(spanRequiredSymbol).toBeTruthy();
        expect(spanRequiredSymbol).toHaveTextContent("*");
      });

      it("when isRequired is false, requiredSymbol does not render", async () => {
        const component = (
          <TextField label={email} onChange={onChange()} isRequired={false} />
        );

        renderWithFormik(component, initialValues, onSubmit);

        const spanRequiredSymbol = await queryTestIdTag(
          spanRequiredSymbolTestId,
        );

        expect(spanRequiredSymbol).toBeFalsy();
      });
    });

    describe("when showHelperText is false", () => {
      it("span label does not render", async () => {
        const component = (
          <TextField
            label={email}
            onChange={onChange()}
            showHelperText={false}
          />
        );

        renderWithFormik(component, initialValues, onSubmit);

        const span = await queryTestIdTag(spanLabelTestId);

        expect(span).toBeFalsy();
      });

      it("requiredSymbol does not render", async () => {
        const component = (
          <TextField
            label={email}
            onChange={onChange()}
            showHelperText={false}
          />
        );

        renderWithFormik(component, initialValues, onSubmit);

        const spanRequiredSymbol = await queryTestIdTag(
          spanRequiredSymbolTestId,
        );

        expect(spanRequiredSymbol).toBeFalsy();
      });
    });
  });

  describe("showValue", () => {
    // it("defaults to false", async () => {
    //   const component = <TextField label={email} onChange={onChange()} />;
    //
    //   renderFormik(component, initialValues, onSubmit);
    //
    //   const span = await getTestIdTag(spanLabelTestId);
    //
    //   expect(span).toBeTruthy();
    //   expect(span).toHaveTextContent("Email");
    // });
  });

  describe("classTesting", () => {
    const textFieldContClass = "text-field";

    const textFieldContClassBaseInfo = "relative";
    const textFieldContClassWidthMed = "w-7/12";

    const inputClass = "text-field-input-password";

    const inputClassBaseInfo = `${elevateClass} m-1 pt-3 w-full bg-gray-200 rounded-md border-2 border-black focus:outline-none text-center`;
    const inputClassHeightMed = "h-14";

    const spanClass = "input-text-span1-password";

    const spanClassBaseInfo =
      "w-full absolute pointer-events-none top-2 text-gray-700 text-center";

    const testsToRun = {
      comp: [
        {
          testId: textFieldContClass,
          result: `${textFieldContClassBaseInfo} ${textFieldContClassWidthMed}`,
        },
        {
          testId: inputClass,
          result: `${inputClassBaseInfo} ${inputClassHeightMed}`,
        },
        {
          testId: spanClass,
          result: `${spanClassBaseInfo} text-xs`,
        },
      ],

      mobile: [
        {
          testId: `${textFieldContClass}-mobile`,
          result: textFieldContClassBaseInfo,
        },
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

          renderWithFormik(component, initialValues, onSubmit);

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

          renderWithFormik(component, initialValues, onSubmit);

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });

    const inputClassHeightShort = "h-9";

    const heightShortTesting = {
      comp: [
        {
          testId: textFieldContClass,
          result: textFieldContClassBaseInfo,
        },
        {
          testId: inputClass,
          result: `${inputClassBaseInfo} ${inputClassHeightShort}`,
        },
        {
          testId: spanClass,
          result: `${spanClassBaseInfo} text-xs`,
        },
      ],
      mobile: [
        {
          testId: `${textFieldContClass}-mobile`,
          result: textFieldContClassBaseInfo,
        },
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

    describe("heightShort - comp", () => {
      heightShortTesting.comp.forEach((test) => {
        it(`${test.testId}`, async () => {
          mockWindowMobileView(false);

          const component = (
            <TextField
              label={pw}
              type={pw}
              onChange={onChange()}
              height="short"
            />
          );

          renderWithFormik(component, initialValues, onSubmit);

          const testId = await getTestIdTag(test.testId);

          expect(testId).toHaveClass(test.result);
        });
      });
    });

    describe("heightShort - mobile", () => {
      heightShortTesting.mobile.forEach((test) => {
        it(`${test.testId}`, async () => {
          mockWindowMobileView(true);

          const component = (
            <TextField
              label={pw}
              type={pw}
              onChange={onChange()}
              height="short"
            />
          );

          renderWithFormik(component, initialValues, onSubmit);

          const testId = await getTestIdTag(test.testId);
          expect(testId).toHaveClass(test.result);
        });
      });
    });

    const textFieldContClassWidthLarge = "w-11/12";

    const widthLargeTesting = {
      comp: [
        {
          testId: textFieldContClass,
          result: `${textFieldContClassBaseInfo} ${textFieldContClassWidthLarge}`,
        },
        {
          testId: inputClass,
          result: `${inputClassBaseInfo} ${inputClassHeightMed}`,
        },
        {
          testId: spanClass,
          result: `${spanClassBaseInfo} text-xs`,
        },
      ],
      mobile: [
        {
          testId: `${textFieldContClass}-mobile`,
          result: `${textFieldContClassBaseInfo} ${textFieldContClassWidthLarge}`,
        },
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

    describe("widthLarge - comp", () => {
      widthLargeTesting.comp.forEach((test) => {
        it(`${test.testId}`, async () => {
          mockWindowMobileView(false);

          const component = (
            <TextField
              label={pw}
              type={pw}
              onChange={onChange()}
              width="large"
            />
          );

          renderWithFormik(component, initialValues, onSubmit);

          const testId = await getTestIdTag(test.testId);

          expect(testId).toHaveClass(test.result);
        });
      });
    });

    describe("widthLarge - mobile", () => {
      widthLargeTesting.mobile.forEach((test) => {
        it(`${test.testId}`, async () => {
          mockWindowMobileView(true);

          const component = (
            <TextField
              label={pw}
              type={pw}
              onChange={onChange()}
              width="large"
            />
          );

          renderWithFormik(component, initialValues, onSubmit);

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

      renderWithFormik(component, initialValues, onSubmit);

      const pageTestId = await getTestIdTag("text-field-mobile");

      const inputTestId = await getTextFieldTag("password-mobile");

      expect(pageTestId).toBeTruthy();

      expect(inputTestId).toBeTruthy();
    });
  });
});
