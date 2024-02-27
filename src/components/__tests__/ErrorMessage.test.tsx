import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag, invalidEmailAndOrPw } from "../testingUtils";
import { geti18n } from "../../store";
import { ErrorMessage } from "../buffet";

describe("<Error/>", () => {
  it("should render the component with accurate text", async () => {
    render(<ErrorMessage text={geti18n("invalidEmailOrPw")} />);

    const pageTestId = await getTestIdTag("error-message");

    expect(pageTestId).toBeInTheDocument();
    expect(pageTestId).toHaveTextContent(invalidEmailAndOrPw);
  });
});
