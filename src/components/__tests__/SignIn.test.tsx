import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag } from "../testingUtils";
import SignIn from "../signIn/SignIn";
import { Provider } from "react-redux";
import store from "../../store";
import App from "../App";

describe("<SignIn/>", () => {
  it("should render the SignIn page", async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    );

    const pageTestId = await getTestIdTag("signIn-page");

    expect(pageTestId).toBeInTheDocument();
  });

  it.todo("all textFields render");
  it.todo("submit button renders");
});
