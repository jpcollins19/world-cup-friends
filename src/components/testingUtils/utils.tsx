import { screen } from "@testing-library/react";

export const getTestIdTag = (testId: string) => {
  return screen.findByTestId(testId as any);
};

export const getText = (text: string) => {
  return screen.queryByText(text as any);
};
