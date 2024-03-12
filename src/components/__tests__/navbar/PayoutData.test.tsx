import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import {
  getTestIdTag,
  mockUseIsMobile,
  mockUseGetActiveUsers,
  mockUseShouldPayoutShow,
} from "../../testingUtils";
import { UserSchema } from "../../../store";
import PayoutData from "../../navbar/PayoutData";
import { createUser } from "../../../hooks/fixtures";

jest.mock("../../../hooks", () => ({
  useIsMobile: jest.fn(),
  useGetActiveUsers: jest.fn(),
  useShouldPayoutShow: jest.fn(),
}));

const user1: UserSchema = createUser();
const user2: UserSchema = createUser(100);
const user3: UserSchema = createUser(10);

const users = [user1, user2, user3];

describe("<PayoutTable/>", () => {
  it("should render the component", async () => {
    mockUseIsMobile(false);
    mockUseGetActiveUsers(users);
    mockUseShouldPayoutShow(true);

    render(<PayoutData />);

    const testId = await getTestIdTag("payoutData");

    expect(testId).toBeInTheDocument();
  });

  it.todo("should not render the component");

  // describe("mobile view", () => {
  //   it("renders the mobile page", async () => {
  //     mockUseIsMobile(false);
  //
  //     render(<PayoutData />);
  //
  //     const testId = await getTestIdTag("payoutData-mobile");
  //
  //     expect(testId).toBeInTheDocument();
  //   });
  // });
});
