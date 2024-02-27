import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { getTestIdTag } from "../testingUtils";
import SignIn from "../signIn/SignIn";
import { Provider } from "react-redux";
import store from "../../store";

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
  it.todo("user logs in successfully");
  it.todo("view pw button works");
  it.todo("3 links at bottom of page take you to accurate urls");
});
