import { screen } from "@testing-library/react";

export const getTestIdTag = (testId: string) => {
  return screen.findByTestId(testId as any);
};
