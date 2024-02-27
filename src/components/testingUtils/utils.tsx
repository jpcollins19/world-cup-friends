import { fireEvent, screen } from "@testing-library/react";

export const getTestIdTag = (testId: string) => {
  return screen.findByTestId(testId as any);
};

export const getText = (text: string) => {
  return screen.queryByText(text as any);
};

export const changeInputText = async (input: any, text: string) => {
  fireEvent.change(input, { target: { value: text } });
};

export const click = async (input: any) => {
  fireEvent.click(input);
};

export const submit = async (input: any) => {
  fireEvent.submit(input);
};

export const matchMediaWorkAround = () => {
  return Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

export const getButtonTestId = (str: string) => {
  return getTestIdTag(`button-${str}`);
};

export const getButton = async (str: string) => {
  const testId = await getButtonTestId(str);

  return testId.querySelector("button");
};
