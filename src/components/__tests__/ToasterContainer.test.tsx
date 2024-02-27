import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag } from "../testingUtils";
import { ToasterContainer } from "../buffet";

describe("<ToasterContainer/>", () => {
  it("should render the component", async () => {
    render(<ToasterContainer className="test" />);

    const pageTestId = await getTestIdTag("toaster-cont");

    expect(pageTestId).toBeInTheDocument();
  });
});
